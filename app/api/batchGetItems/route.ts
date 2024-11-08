// app/api/batchGetItems/route.ts
import { NextResponse } from 'next/server';
import { batchGetItems } from '../../../lib/dynamoHelpers';

export async function POST(request: Request) {
  const body = await request.json();
  const result = await batchGetItems({
    tableName: body.tableName,
    keys: body.keys
  });

  return NextResponse.json(result);
}
