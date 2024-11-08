'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { CardMain } from '@/components/ui/card/main';

export default function CreateEvent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [gate, setGate] = useState({ type: 'None', operator: '=', value: '' });

  const addEventToDynamo = async () => {
    const tableName = 'irlsc_events';
    const eventId =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const response = await fetch('/api/addItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tableName: tableName,
        content: {
          eventId,
          title,
          description,
          date,
          time,
          gate: gate.type !== 'None' ? gate : null
        }
      })
    });
    const result = await response.json();
    console.log('Add item result:', result);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, description, date, time, gate });
    addEventToDynamo();
  };

  return (
    <CardMain>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Create Event
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter event description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gate">Gate</Label>
            <div className="flex space-x-2">
              <Select
                value={gate.type}
                onValueChange={(value) => setGate({ ...gate, type: value })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select gate type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="None">None</SelectItem>
                  <SelectItem value="Github">Github</SelectItem>
                  <SelectItem value="YC">YC</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={gate.operator}
                onValueChange={(value) => setGate({ ...gate, operator: value })}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder="=" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="=">=</SelectItem>
                  <SelectItem value="<=">{'<='}</SelectItem>
                  <SelectItem value=">=">{'>='}</SelectItem>
                </SelectContent>
              </Select>
              <Input
                value={gate.value}
                onChange={(e) => setGate({ ...gate, value: e.target.value })}
                placeholder="Enter value"
                className="flex-grow"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Create Event
          </Button>
        </CardFooter>
      </form>
    </CardMain>
  );
}
