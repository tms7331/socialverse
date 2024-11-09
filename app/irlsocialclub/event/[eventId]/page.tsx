'use client';

import {
  CalendarIcon,
  Check,
  ClockIcon,
  MapPinIcon,
  UsersIcon
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

type UserProfile = {
  did: string;
  userName: string;
  image: string;
  bio: string;
};

const writeJoinEvent = async (eventId: string, did: string) => {
  const tableName = 'irlsc_attendees';
  const response = await fetch('/api/addItem', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tableName: tableName,
      content: { eventId: eventId, did: did }
    })
  });
  const result = await response.json();
  console.log('Add item result:', result);
};

const getAttendees = async (eventId: string) => {
  const response = await fetch('/api/queryItems', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tableName: 'irlsc_attendees',
      partitionKey: 'eventId', // Example partition key for GSI
      partitionValue: eventId // Value to query by
      //indexName: "EventIdIndex",     // Secondary index name
      // Optional sort key and value
      //sortKey: "createdAt",
      //sortValue: 1633036800,
    })
  });
  const result = await response.json();
  console.log('Queried items from secondary index:', result);
  return result;
};

const bulkCommonalitiesQuery = async (did: string, attendeeDids: string[]) => {
  const tableName = 'irlsc_commonalities';
  // did and dataTag for EACH of the keys
  const keys = attendeeDids.map((source) => ({ did1: did, did2: source }));
  const response = await fetch('/api/batchGetItems', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tableName: tableName,
      keys: keys
    })
  });
  const result = await response.json();
  console.log('Bulk queried commonalities items:', result);
  return result;
};

const bulkUserQuery = async (attendeeDids: string[]) => {
  // socialverse_data : "did", "dataTag"
  const tableName = 'socialverse_users';
  // did and dataTag for EACH of the keys
  const keys = attendeeDids.map((source) => ({ did: source }));
  const response = await fetch('/api/batchGetItems', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tableName: tableName,
      keys: keys
    })
  });

  const result = await response.json();
  console.log('Bulk queried items:', result);
  return result;
};

export default function EventPage() {
  const { data: session } = useSession();
  const params = useParams();
  const eventId = params.eventId;
  const [isAttending, setIsAttending] = useState(false);
  const [attendees, setAttendees] = useState<UserProfile[]>([]);
  const [commonalities, setCommonalities] = useState<{ [key: string]: string }>(
    {}
  );

  const joinEvent = () => {
    // TODO: actually join the event
    // console.log("Join event");
    //const did = session?.user
    //console.log("DID?", did)
    //console.log("Session?", session)
    //const didf = "abcd";
    const did = session?.googleId;
    writeJoinEvent(eventId as string, did as string);
    setIsAttending(true);
  };

  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    attendees: 0
  });

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const tableName = 'irlsc_events';
        const response = await fetch('/api/getItem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            tableName: tableName,
            key: { eventId: eventId }
          })
        });
        const result = await response.json();
        console.log('Fetch event result:', result);
        if (result.item) {
          setEvent((prevState) => ({
            ...prevState,
            ...result.item
          }));
        }

        // Get attendees
        const attendeesResp = await getAttendees(eventId as string);
        if (attendeesResp.items) {
          const attendeeDids = attendeesResp.items.map(
            (attendee: any) => attendee.did
          );
          const did = session?.googleId;
          console.log('Attendees:!', attendeesResp.items);
          console.log('DID:!', did);
          console.log('Is attending:!', isAttending);
          setIsAttending(
            attendeeDids.some((attendeeDid: string) => attendeeDid === did)
          );

          // Iterate through list of attendees, and pull their info from the socialverse_users table

          // bulk query instead....
          const attendeesProfileResp = await bulkUserQuery(attendeeDids);
          console.log('Attendees profile response:', attendeesProfileResp);
          // const attendeesWithInfo = attendeesProfileResp.map((attendee: any) => ({
          //     ...attendee,
          //     ...attendees[attendee.did]
          // }));
          if (
            attendeesProfileResp.items &&
            attendeesProfileResp.items.length > 0
          ) {
            setAttendees(attendeesProfileResp.items);
            setEvent((prevState) => ({
              ...prevState,
              attendees: attendeesProfileResp.items.length
            }));
          }

          // Get commonalities
          if (did) {
            const commonalitiesResp = await bulkCommonalitiesQuery(
              did as string,
              attendeeDids
            );
            console.log('Commonalities response:', commonalitiesResp);
            commonalitiesResp.items.forEach((item: any) => {
              // We'll always be one - use the OTHER one
              const userDid = item.did1 == did ? item.did2 : item.did1;
              setCommonalities((prevState) => ({
                ...prevState,
                [userDid]: item.commonalities
              }));
            });
          }

          // TODO - bulk query
          // const attendees = attendeesResp.items.map(async (attendee: any) => {
          //     const userResp = await getUser(attendee.did);
          //     return userResp.item;
          // });
          // setAttendees(attendees);
        }
        console.log('Attendees:', attendeesResp.items);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    if (eventId) {
      fetchEventData();
    }
  }, [eventId]);

  return (
    <div className="max-w-2xl mx-auto p-4 sm:px-0 sm :py-8">
      <h1 className="text-3xl font-bold mb-6">{event.title}</h1>

      <div className="space-y-4 mb-8">
        <div className="flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2 text-muted-foreground" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center">
          <ClockIcon className="w-5 h-5 mr-2 text-muted-foreground" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center">
          <UsersIcon className="w-5 h-5 mr-2 text-muted-foreground" />
          <span>{event.attendees} attendees</span>
        </div>
      </div>

      <div className="bg-muted p-4 rounded-lg mb-8 text-black">
        <h2 className="text-lg font-semibold mb-2">Event Description</h2>
        <p>{event.description}</p>
      </div>
      {!isAttending ? (
        <Button onClick={joinEvent} className="w-full md:w-auto" size='lg'>
          Join Event
        </Button>
      ) : (
        <Button
          disabled
          className="w-full md:w-auto bg-green-600 hover:bg-green-600 cursor-default"
        >
          <Check className="mr-2 h-4 w-4" />
          You're attending!
        </Button>
      )}

      <div className="container mx-auto py-4 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Attendees</h1>
        {attendees.map((profile) => (
          <Card key={profile.did} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                <div className="flex-1 p-6 bg-background">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={profile.image} alt={profile.userName} />
                      <AvatarFallback>
                        {profile.userName
                          .split(' ')
                          .map((n: string) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-semibold">
                        {profile.userName}
                      </h2>
                      <p className="text-muted-foreground">{profile.bio}</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 p-6 bg-muted">
                  <h3 className="text-lg font-semibold mb-2">Commonalities</h3>
                  <p className="text-muted-foreground">
                    {commonalities[profile.did]}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
