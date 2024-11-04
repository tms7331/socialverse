import { NextResponse } from "next/server";
import { getItem } from "../../../lib/dynamoHelpers";

export async function POST(request: Request) {
    const body = await request.json();
    const result = await getItem(body.tableName, body.key);
    return NextResponse.json(result);
}
