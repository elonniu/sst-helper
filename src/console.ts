import {Api, ApiGatewayV1Api, Bucket, Cognito, EventBus, Queue, Stack, Table, Topic} from "sst/constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import {aws_dynamodb} from "aws-cdk-lib";
import {CloudFrontWebDistribution} from "aws-cdk-lib/aws-cloudfront";

export function stackUrl(stack: Stack) {
    const {region} = stack;
    return `https://${region}.console.${awsDomain(stack)}/cloudformation/home?region=${region}#/stacks/stackinfo?filteringStatus=active&filteringText=&viewNested=true&stackId=${stack.stackId}`;
}

export function cloudFrontUrl(stack: Stack, cf: CloudFrontWebDistribution) {
    const {region} = stack;
    return `https://${region}.console.${awsDomain(stack)}/cloudfront/v3/home?region=${region}#/distributions/${cf.distributionId}`;
}

export function apiUrl(api: Api | ApiGatewayV1Api, stack: Stack) {
    const {region} = stack;

    // @ts-ignore
    if (api?.restApiId) {
        // @ts-ignore
        return `https://${region}.console.${awsDomain(stack)}/apigateway/home?region=${region}#/apis/${api.restApiId}/resources/`;
    }

    return `https://${region}.console.${awsDomain(stack)}/apigateway/main/api-detail?api=${api.id}&region=${region}`;
}

export function userPoolUrl(auth: Cognito, stack: Stack) {
    const {region} = stack;

    if (region.startsWith('cn-')) {
        return `https://${region}.console.${awsDomain(stack)}/cognito/v2/idp/user-pools/${auth.userPoolId}/users?region=${region}`;
    }

    return `https://${region}.console.${awsDomain(stack)}/cognito/v2/idp/user-pools/${auth.userPoolId}/users?region=${region}`;
}

export function identityPoolUrl(auth: Cognito, stack: Stack) {
    const {region} = stack;

    if (region.startsWith('cn-')) {
        return `https://${region}.console.amazonaws.cn/cognito/v2/identity/identity-pools/${auth.cognitoIdentityPoolId}/user-statistics?region=${region}`;
    }

    return `https://${region}.console.amazonaws.cn/cognito/v2/identity/identity-pools/${auth.cognitoIdentityPoolId}/user-statistics?region=${region}`;
}

export function s3Url(bucket: Bucket, stack: Stack) {

    if (stack.region.startsWith('cn-')) {
        return `https://console.${awsDomain(stack)}/s3/buckets/${bucket.bucketName}?region=${stack.region}&tab=objects`;
    }

    return `https://s3.console.${awsDomain(stack)}/s3/buckets/${bucket.bucketName}?region=${stack.region}&tab=objects`;
}

export function bucketUrl(bucket: Bucket, stack: Stack) {
    return s3Url(bucket, stack);
}

export function ddbUrl(table: Table | aws_dynamodb.Table, stack: Stack) {
    const {region} = stack;
    return `https://${region}.console.${awsDomain(stack)}/dynamodbv2/home#table?initialTagKey=&name=${table.tableName}`;
}

export function ddbExploreUrl(table: Table, stack: Stack) {
    const {region} = stack;
    return `https://${region}.console.${awsDomain(stack)}/dynamodbv2/home?region=${region}#item-explorer?initialTagKey=&table=${table.tableName}`;
}

export function sqsUrl(queue: Queue, stack: Stack) {
    const {region} = stack;
    return `https://${region}.console.${awsDomain(stack)}/sqs/v2/home?region=${region}#/queues/https%3A%2F%2Fsqs.${stack.region}.amazonaws.com%2F${stack.account}%2F${queue.queueName}`;
}

export function busUrl(bus: EventBus, stack: Stack) {

    const {region} = stack;

    return `https://${region}.console.${awsDomain(stack)}/events/home?region=${region}#/eventbus/${bus.eventBusName}`;
}

export function topicUrl(topic: Topic, stack: Stack) {

    const {region} = stack;

    return `https://${region}.console.${awsDomain(stack)}/sns/v3/home?region=${region}#/topic/${topic.topicArn}`;
}

export function kdsUrl(streamName: string, stack: Stack) {

    const {region} = stack;

    return `https://${region}.console.${awsDomain(stack)}/kinesis/home?region=${region}#/streams/details/${streamName}/monitoring`;
}

export function distributionUrl(id: string, stack: Stack) {

    const {region} = stack;

    return `https://${region}.console.${awsDomain(stack)}/cloudfront/v3/home?#/distributions/${id}`;
}

export function route53Url(hostedZoneId: string, stack: Stack) {

    const {region} = stack;

    return `https://${region}.console.${awsDomain(stack)}/route53/v2/hostedzones#ListRecordSets/${hostedZoneId}`;
}

export function lambdaUrl(fn: lambda.Function, stack: Stack) {

    const {region} = stack;

    return `https://${region}.console.${awsDomain(stack)}/lambda/home?region=${region}#/functions/${fn.functionName}`;
}

export function awsDomain(stack: Stack) {

    const {region} = stack;

    if (region && region.startsWith('cn')) {
        return `amazonaws.cn`;
    }

    return `aws.amazon.com`;
}
