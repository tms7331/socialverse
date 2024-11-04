import dynamoDb from "./dynamo";
import { PutCommand, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

// Define the item structure
interface DynamoDBItem {
    [key: string]: any;
}

// Function to add an item to DynamoDB
export const addItem = async (tableName: string, item: DynamoDBItem) => {
    try {
        const command = new PutCommand({
            TableName: tableName,
            Item: item,
        });
        await dynamoDb.send(command);
        return { success: true };
    } catch (error) {
        console.error("Error adding item:", error);
        return { success: false, error };
    }
};

// Function to get an item from DynamoDB
export const getItem = async (tableName: string, key: DynamoDBItem) => {
    try {
        const command = new GetCommand({
            TableName: tableName,
            Key: key,
        });
        const result = await dynamoDb.send(command);
        return { success: true, item: result.Item };
    } catch (error) {
        console.error("Error getting item:", error);
        return { success: false, error };
    }
};


export const getAllItems = async (tableName: string) => {
    try {
        const command = new ScanCommand({
            TableName: tableName,
        });
        const result = await dynamoDb.send(command);
        return { success: true, items: result.Items };
    } catch (error) {
        console.error("Error scanning table:", error);
        return { success: false, error };
    }
};
