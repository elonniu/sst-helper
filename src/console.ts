import {Api, ApiGatewayV1Api, Stack} from "sst/constructs";
import {fixedPath} from "./url.js";
import {RestApi} from "aws-cdk-lib/aws-apigateway";

export function stackUrl(stackId: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/cloudformation/home?#/stacks/stackinfo?stackId=${stackId}`;
}

export function cloudFrontUrl(distributionId: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/cloudfront/v3/home?#/distributions/${distributionId}`;
}

export function apiUrl(api: Api | ApiGatewayV1Api | RestApi, stack: Stack) {
    const {region} = stack;

    // @ts-ignore
    if (api?.restApiId) {
        // @ts-ignore
        return `https://${region}.console.${awsDomain(region)}/apigateway/home?#/apis/${api.restApiId}/resources/`;
    }

    // @ts-ignore
    return `https://${region}.console.${awsDomain(region)}/apigateway/main/api-detail?api=${api?.httpApiId}`;
}

export function userPoolUrl(userPoolId: string, region: string) {

    if (region.startsWith('cn-')) {
        return `https://${region}.console.${awsDomain(region)}/cognito/v2/idp/user-pools/${userPoolId}/users`;
    }

    return `https://${region}.console.${awsDomain(region)}/cognito/v2/idp/user-pools/${userPoolId}/users`;
}

export function identityPoolUrl(cognitoIdentityPoolId: string, region: string) {
    if (region.startsWith('cn-')) {
        return `https://${region}.console.${region}/cognito/v2/identity/identity-pools/${cognitoIdentityPoolId}/user-statistics`;
    }

    return `https://${region}.console.${region}/cognito/v2/identity/identity-pools/${cognitoIdentityPoolId}/user-statistics`;
}

export function s3Url(bucketName: string, region: string) {
    if (region.startsWith('cn-')) {
        return `https://console.${awsDomain(region)}/s3/buckets/${bucketName}`;
    }

    return `https://s3.console.${awsDomain(region)}/s3/buckets/${bucketName}`;
}

export function bucketUrl(bucketName: string, region: string) {
    return s3Url(bucketName, region);
}

export function ddbUrl(tableName: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/dynamodbv2/home#table?name=${tableName}`;
}

export function sfUrl(stateMachineArn: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/states/home?#/statemachines/view/${stateMachineArn}`;
}

export function executionUrl(executionArn: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/states/home?#/v2/executions/details/${executionArn}`;
}

export function ec2InstanceUrl(arn: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/ec2/home?#InstanceDetails:instanceId=${arn}`;
}

export function fargateTaskUrl(arn: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/ecs/v2/clusters/${arn.split('/')[1]}/tasks/${arn.split('/')[2]}`;
}

export function batchJobUrl(arn: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/batch/home?#jobs/fargate/detail/${arn}`;
}

export function ddbExploreUrl(tableName: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/dynamodbv2/home?#item-explorer?table=${tableName}`;
}

export function sqsUrl(queueName: string, region: string, account: string) {
    return `https://${region}.console.${awsDomain(region)}/sqs/v2/home?#/queues/https%3A%2F%2Fsqs.${region}.amazonaws.com%2F${account}%2F${queueName}`;
}

export function busUrl(eventBusName: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/events/home?#/eventbus/${eventBusName}`;
}

export function topicUrl(topicArn: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/sns/v3/home?#/topic/${topicArn}`;
}

export function kdsUrl(streamName: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/kinesis/home?#/streams/details/${streamName}/monitoring`;
}

export function distributionUrl(id: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/cloudfront/v3/home?#/distributions/${id}`;
}

export function route53Url(hostedZoneId: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/route53/v2/hostedzones#ListRecordSets/${hostedZoneId}`;
}

export function lambdaUrl(functionName: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/lambda/home?#/functions/${functionName}`;
}

export function lambdaLogUrl(context: any, region: string) {
    return `https://${region}.console.${awsDomain(region)}/cloudwatch/home?#logsV2:log-groups/log-group/${fixedPath(context.logGroupName)}/log-events/${fixedPath(context.logStreamName)}`;
}

export function apiLogUrl(apiId: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/apigateway/main/api-detail?api=${apiId}`;
}

export function awsDomain(region: string) {

    if (region && region.startsWith('cn')) {
        return `amazonaws.cn`;
    }

    return `aws.amazon.com`;
}
