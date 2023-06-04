import {DynamoDB} from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();

export async function ddbPut(table: string, items: object[]) {

    const groupSize = 25;

    const batchWriteParallel = async (items: object[]) => {
        const promises = [];
        for (let i = 0; i < items.length; i += groupSize) {
            promises.push(dynamoDb.batchWrite({
                RequestItems: {
                    [table]: items.slice(i, i + groupSize)
                },
            }).promise());
        }
        return Promise.all(promises);
    };

    batchWriteParallel(items)
        .then((data) => {
            console.log('batchWriteParallel succeed: ', data);
        })
        .catch((error) => {
            console.error('batchWriteParallel error: ', error);
        });

}
