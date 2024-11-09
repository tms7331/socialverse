import { NextResponse } from 'next/server';
import { addItem } from '../../../lib/dynamoHelpers';

export async function POST(request: Request) {
  const body = await request.json();
  const result = await addItem(body.tableName, body.content);
  return NextResponse.json(result);
}
