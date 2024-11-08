// app/api/queryItems/route.ts
import { NextResponse } from 'next/server';
import { queryItems } from '../../../lib/dynamoHelpers';

export async function POST(request: Request) {
  const {
    tableName,
    partitionKey,
    partitionValue,
    sortKey,
    sortValue,
    indexName
  } = await request.json();

  const result = await queryItems({
    tableName: tableName,
    partitionKey,
    partitionValue,
    sortKey,
    sortValue,
    indexName // Pass indexName to the query function
  });

  return NextResponse.json(result);
}
