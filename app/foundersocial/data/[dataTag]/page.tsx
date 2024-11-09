'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { CardMain } from '@/components/ui/card/main';

export default function DataManagementClient() {
  const { data: session } = useSession();
  const params = useParams();
  const dataTag = params.dataTag;
  console.log('Data tag:', dataTag);

  const [dataExists, setDataExists] = useState(false);
  const [data, setData] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getItemFromDynamo = async () => {
    const tableName = 'socialverse_data';
    const did = session?.googleId;
    const response = await fetch('/api/getItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tableName: tableName,
        key: { did: did, dataTag: dataTag }
      })
    });
    const result = await response.json();
    if (result.item) {
      setDataExists(true);
      setData(result.item.data);
    }
    console.log('Get item result:', result);
    setIsLoading(false);
  };

  useEffect(() => {
    getItemFromDynamo();
  }, []);

  const addItemToDynamo = async () => {
    const did = session?.googleId;
    const tableName = 'socialverse_data';
    const response = await fetch('/api/addItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tableName: tableName,
        content: { did: did, dataTag: dataTag, data: 'fake data 123' }
      })
    });
    const result = await response.json();
    console.log('Add item result:', result);
  };

  const handleImportData = async () => {
    await addItemToDynamo();
  };

  if (isLoading) {
    return <CardMain classValue="text-center p-4">Loading...</CardMain>;
  }

  if (!dataExists) {
    return (
      <CardMain classValue="text-center p-4">
        <p className="mb-4">No data found. Would you like to import data?</p>
        <Button onClick={handleImportData} size="lg">
          Import Data
        </Button>
      </CardMain>
    );
  }

  return (
    <CardMain>
      {data ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data}
        </div>
      ) : (
        <p>No data to display.</p>
      )}
    </CardMain>
  );
}
