var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DynamoDB } from "aws-sdk";
const dynamoDb = new DynamoDB.DocumentClient();
export function ddbPut(table, items) {
    return __awaiter(this, void 0, void 0, function* () {
        const groupSize = 25;
        const batchWriteParallel = (items) => __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            for (let i = 0; i < items.length; i += groupSize) {
                promises.push(dynamoDb.batchWrite({
                    RequestItems: {
                        [table]: items.slice(i, i + groupSize)
                    },
                }).promise());
            }
            return Promise.all(promises);
        });
        batchWriteParallel(items)
            .then((data) => {
            console.log('batchWriteParallel succeed: ', data);
        })
            .catch((error) => {
            console.error('batchWriteParallel error: ', error);
        });
    });
}
