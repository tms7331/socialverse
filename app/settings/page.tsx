'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';

export default function SettingsPage() {
  const [uploadedData, setUploadedData] = useState({
    strava: false,
    identity: false,
    spotify: false,
    twitter: false,
    instagram: false,
    linkedin: false
  });

  const [filters, setFilters] = useState({
    sameIncome: false,
    sameMusicTaste: false,
    sameFitness: false
  });

  const [sortBy, setSortBy] = useState('compatibility');

  const handleDataUpload = (dataType: keyof typeof uploadedData) => {
    setUploadedData((prev) => ({ ...prev, [dataType]: true }));
  };

  const handleFilterChange = (filterType: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [filterType]: !prev[filterType] }));
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Data</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(uploadedData).map(([key, value]) => (
            <Button
              key={key}
              variant="outline"
              className="justify-between"
              onClick={() => handleDataUpload(key as keyof typeof uploadedData)}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
              {value ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <X className="h-4 w-4 text-gray-300" />
              )}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Filter Users</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {Object.entries(filters).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={value}
                onCheckedChange={() =>
                  handleFilterChange(key as keyof typeof filters)
                }
              />
              <label
                htmlFor={key}
                className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {key === 'sameIncome'
                  ? 'Same Income'
                  : key === 'sameMusicTaste'
                    ? 'Same Music Taste'
                    : 'Same Fitness'}
              </label>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sort By</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select sorting criteria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="compatibility">Compatibility</SelectItem>
              <SelectItem value="musicTaste">Music Taste</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  );
}
