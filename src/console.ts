import {Api, ApiGatewayV1Api, App, Bucket, EventBus, Queue, Stack, Table, Topic} from "sst/constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import {aws_dynamodb} from "aws-cdk-lib";

export function stackUrl(stack: Stack, app: App) {
    const {region} = app;
    return `https://${region}.console.${awsDomain(app)}/cloudformation/home?region=${region}#/stacks/stackinfo?filteringStatus=active&filteringText=&viewNested=true&stackId=${stack.stackId}`;
}

export function apiUrl(api: Api | ApiGatewayV1Api, app: App) {
    const {region} = app;

    // @ts-ignore
    if (api?.restApiId) {
        // @ts-ignore
        return `https://${region}.console.${awsDomain(app)}/apigateway/home?region=${region}#/apis/${api.restApiId}/resources/`;
    }

    return `https://${region}.console.${awsDomain(app)}/apigateway/main/api-detail?api=${api.id}&region=${region}`;
}

export function s3Url(bucket: Bucket, app: App) {

    if (app.region.startsWith('cn-')) {
        return `https://console.${awsDomain(app)}/s3/buckets/${bucket.bucketName}?region=${app.region}&tab=objects`;
    }

    return `https://s3.console.${awsDomain(app)}/s3/buckets/${bucket.bucketName}?region=${app.region}&tab=objects`;
}

export function bucketUrl(bucket: Bucket, app: App) {
    return s3Url(bucket, app);
}

export function ddbUrl(table: Table | aws_dynamodb.Table, app: App) {
    const {region} = app;
    return `https://${region}.console.${awsDomain(app)}/dynamodbv2/home#table?initialTagKey=&name=${table.tableName}`;
}

export function ddbExploreUrl(table: Table, app: App) {
    const {region} = app;
    return `https://${region}.console.${awsDomain(app)}/dynamodbv2/home?region=${region}#item-explorer?initialTagKey=&table=${table.tableName}`;
}

export function sqsUrl(queue: Queue, app: App) {
    const {region} = app;
    return `https://${region}.console.${awsDomain(app)}/sqs/v2/home?region=${region}#/queues/https%3A%2F%2Fsqs.${app.region}.amazonaws.com%2F${app.account}%2F${queue.queueName}`;
}

export function busUrl(bus: EventBus, app: App) {

    const {region} = app;

    return `https://${region}.console.${awsDomain(app)}/events/home?region=${region}#/eventbus/${bus.eventBusName}`;
}

export function topicUrl(topic: Topic, app: App) {

    const {region} = app;

    return `https://${region}.console.${awsDomain(app)}/sns/v3/home?region=${region}#/topic/${topic.topicArn}`;
}

export function kdsUrl(streamName: string, app: App) {

    const {region} = app;

    return `https://${region}.console.${awsDomain(app)}/kinesis/home?region=${region}#/streams/details/${streamName}/monitoring`;
}

export function distributionUrl(id: string, app: App) {

    const {region} = app;

    return `https://${region}.console.${awsDomain(app)}/cloudfront/v3/home?#/distributions/${id}`;
}

export function route53Url(hostedZoneId: string, app: App) {

    const {region} = app;

    return `https://${region}.console.${awsDomain(app)}/route53/v2/hostedzones#ListRecordSets/${hostedZoneId}`;
}

export function lambdaUrl(fn: lambda.Function, app: App) {

    const {region} = app;

    return `https://${region}.console.${awsDomain(app)}/lambda/home?region=${region}#/functions/${fn.functionName}`;
}

export function awsDomain(app: App) {

    const {region} = app;

    if (region && region.startsWith('cn')) {
        return `amazonaws.cn`;
    }

    return `aws.amazon.com`;
}
