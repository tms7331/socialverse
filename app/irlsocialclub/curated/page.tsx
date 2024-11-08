'use client';;
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CheckboxText } from '@/components/ui/checkbox/text';

export default function Component() {
  const [availability, setAvailability] = useState('');
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedMeetingPreferences, setSelectedMeetingPreferences] = useState<
    string[]
  >([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activities = [
    { id: 'dinners', label: 'Dinners' },
    { id: 'walks', label: 'Walks' },
    {
      id: 'sports',
      label: 'Sports',
      isCategory: true,
      children: [
        { id: 'pickleball', label: 'Pickleball' },
        { id: 'ax-throwing', label: 'Ax Throwing' },
        { id: 'hiking', label: 'Hiking' }
      ]
    },
    {
      id: 'activities',
      label: 'Activities',
      isCategory: true,
      children: [
        { id: 'museums', label: 'Museums' },
        { id: 'arcades', label: 'Arcades' },
        { id: 'escape-room', label: 'Escape Room' }
      ]
    }
  ];

  const meetingPreferences = [
    { id: 'fun-evening', label: 'Fun evening' },
    { id: 'make-new-friends', label: 'Make new friends' },
    { id: 'professional-networking', label: 'Professional networking' }
  ];

  const handleActivityChange = (activityId: string, checked: boolean) => {
    setSelectedActivities((prev) =>
      checked ? [...prev, activityId] : prev.filter((id) => id !== activityId)
    );
  };

  const handleMeetingPreferenceChange = (
    preferenceId: string,
    checked: boolean
  ) => {
    setSelectedMeetingPreferences((prev) =>
      checked
        ? [...prev, preferenceId]
        : prev.filter((id) => id !== preferenceId)
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Availability:', availability);
    console.log('Selected Activities:', selectedActivities);
    console.log('Meeting Preferences:', selectedMeetingPreferences);
    // Handle form submission here
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Thank you!</h1>
        <p className="text-lg">We&apos;ll be in touch!</p>
      </div>
    );
  }

  return (
    <div className="relative container mx-auto p-4 my-12">
      <div className="absolute inset-0 bg-background rounded-xl" />
      <div className="relative text-black">
        <h1 className="text-2xl font-bold mb-4">Curated</h1>
        <p className="mb-6 text-lg">
          Sign up to join a curated event! Describe what you&apos;re looking for
          and we&apos;ll do the rest!
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="availability"
              className="block text-base font-medium mb-2"
            >
              Describe your availability
            </label>
            <Textarea
              id="availability"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              placeholder="I'm free on weekends and after 6pm on weekdays..."
              className="w-full"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Select activities that sound fun:
            </h2>
            <div className="space-y-6">
              {activities.map((activity) => (
                <div key={activity.id} className="space-y-2">
                  {activity.isCategory ? (
                    <h3 className="text-md font-medium">{activity.label}</h3>
                  ) : (
                    <CheckboxText
                      id={activity.id}
                      checked={selectedActivities.includes(activity.id)}
                      onCheckedChange={(checked) =>
                        handleActivityChange(activity.id, checked as boolean)
                      }
                    >
                      {activity.label}
                    </CheckboxText>
                  )}
                  {activity.children && (
                    <div className="space-y-2">
                      {activity.children.map((child) => (
                        <div
                          key={child.id}
                          className="flex items-center space-x-2"
                        >
                          <CheckboxText
                            id={child.id}
                            checked={selectedActivities.includes(child.id)}
                            onCheckedChange={(checked) =>
                              handleActivityChange(child.id, checked as boolean)
                            }
                          >
                            {child.label}
                          </CheckboxText>
                          {/* <label
                            htmlFor={child.id}
                            className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            
                          </label> */}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">
              What are you hoping to get out of this event?
            </h2>
            <div className="space-y-2">
              {meetingPreferences.map((preference) => (
                <div
                  key={preference.id}
                  className="flex items-center space-x-2"
                >
                  <CheckboxText
                    id={preference.id}
                    checked={selectedMeetingPreferences.includes(preference.id)}
                    onCheckedChange={(checked) =>
                      handleMeetingPreferenceChange(
                        preference.id,
                        checked as boolean
                      )
                    }
                  >
                    {preference.label}
                  </CheckboxText>
                  {/* <label
                    htmlFor={preference.id}
                    className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    
                  </label> */}
                </div>
              ))}
            </div>
          </div>
          <Button type="submit" size="lg">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
