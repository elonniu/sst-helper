import {BatchWriteItemCommand, DynamoDBClient, ScanCommand} from "@aws-sdk/client-dynamodb";

export async function scanTable(client: DynamoDBClient, tableName: string) {
    const command = new ScanCommand({TableName: tableName});
    const response = await client.send(command);
    return response.Items;
}

export async function batchPut(client: DynamoDBClient, table: string, items: object[]) {

    if (items.length === 0) {
        return;
    }

    const requests = items.map(item => ({PutRequest: {Item: item}}));

    return await ddbPut(client, table, requests);
}

async function ddbPut(client: DynamoDBClient, table: string, items: object[]) {

    const groupSize = 25;

    const batchWriteParallel = async (items: object[]) => {
        const promises = [];
        for (let i = 0; i < items.length; i += groupSize) {
            const command = new BatchWriteItemCommand({RequestItems: {[table]: items.slice(i, i + groupSize)}});

            promises.push(
                client.send(command)
            );
        }
        return Promise.all(promises);
    };

    await batchWriteParallel(items)
        .then((data) => {
            console.log('batchWriteParallel succeed: ', data);
        })
        .catch((error) => {
            console.error('batchWriteParallel error: ', error);
        });

}

export async function clearDdb(client: DynamoDBClient, tableName: string) {

    let data = await scanTable(client, tableName);

    if (!data) {
        return 0;
    }

    let items = [];

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        items.push({
            DeleteRequest: {
                Key: {
                    id: item.id,
                }
            }
        });
    }

    await ddbPut(client, tableName, items);

    return data.length;
}
