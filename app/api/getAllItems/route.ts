import { NextResponse } from "next/server";
import { getAllItems } from "../../../lib/dynamoHelpers";

export async function POST(request: Request) {
    const body = await request.json();
    const result = await getAllItems(body.tableName);
    return NextResponse.json(result);
}
