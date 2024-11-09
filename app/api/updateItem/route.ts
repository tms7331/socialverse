// app/api/updateItem/route.ts
import { NextResponse } from 'next/server';
import { updateItem } from '../../../lib/dynamoHelpers';

export async function POST(request: Request) {
  const body = await request.json();
  const result = await updateItem({
    tableName: body.tableName,
    key: body.key,
    updates: body.updates
  });
  return NextResponse.json(result);
}
