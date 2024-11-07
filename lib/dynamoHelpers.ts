import dynamoDb from "./dynamo";
import { PutCommand, GetCommand, ScanCommand, QueryCommand, BatchGetCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";


// Define the item structure
interface DynamoDBItem {
    [key: string]: any;
}

interface QueryParams {
    tableName: string;
    partitionKey: string;
    partitionValue: any;
    sortKey?: string;
    sortValue?: any;
    indexName?: string; // Optional index name for secondary index
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


export const queryItems = async ({
    tableName,
    partitionKey,
    partitionValue,
    sortKey,
    sortValue,
    indexName,
}: QueryParams) => {
    try {
        const keyConditionExpression = sortKey
            ? `${partitionKey} = :partitionValue AND ${sortKey} = :sortValue`
            : `${partitionKey} = :partitionValue`;

        const expressionAttributeValues = {
            ":partitionValue": partitionValue,
            ...(sortKey && { ":sortValue": sortValue }),
        };

        const command = new QueryCommand({
            TableName: tableName,
            IndexName: indexName, // Add index name if provided
            KeyConditionExpression: keyConditionExpression,
            ExpressionAttributeValues: expressionAttributeValues,
        });

        const result = await dynamoDb.send(command);
        return { success: true, items: result.Items };
    } catch (error) {
        console.error("Error querying items:", error);
        return { success: false, error };
    }
};


interface BatchGetParams {
    tableName: string;
    keys: Array<{ [key: string]: any }>; // Array of keys to retrieve items by
}

export const batchGetItems = async ({ tableName, keys }: BatchGetParams) => {
    try {
        const command = new BatchGetCommand({
            RequestItems: {
                [tableName]: {
                    Keys: keys,
                },
            },
        });

        const result = await dynamoDb.send(command);
        return { success: true, items: result.Responses?.[tableName] || [] };
    } catch (error) {
        console.error("Error in batch get items:", error);
        return { success: false, error };
    }
};


interface UpdateParams {
    tableName: string;
    key: { [key: string]: any };  // Key to identify the item (partition key and, if applicable, sort key)
    updates: { [field: string]: any };  // Fields and values to update
}

export const updateItem = async ({ tableName, key, updates }: UpdateParams) => {
    try {
        // Create UpdateExpression and ExpressionAttributeValues dynamically
        const updateExpressionParts: string[] = [];
        const expressionAttributeValues: { [key: string]: any } = {};

        Object.keys(updates).forEach((field) => {
            const attributeKey = `:${field}`;
            updateExpressionParts.push(`${field} = ${attributeKey}`);
            expressionAttributeValues[attributeKey] = updates[field];
        });

        const updateExpression = `SET ${updateExpressionParts.join(", ")}`;

        const command = new UpdateCommand({
            TableName: tableName,
            Key: key,
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: expressionAttributeValues,
            ReturnValues: "ALL_NEW",  // Return the updated item
        });

        const result = await dynamoDb.send(command);
        return { success: true, item: result.Attributes };
    } catch (error) {
        console.error("Error updating item:", error);
        return { success: false, error };
    }
};
