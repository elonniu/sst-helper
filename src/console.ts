import {Api, ApiGatewayV1Api, Stack} from "sst/constructs";

export function stackUrl(stackId: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/cloudformation/home?region=${region}#/stacks/stackinfo?filteringStatus=active&filteringText=&viewNested=true&stackId=${stackId}`;
}

export function cloudFrontUrl(distributionId: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/cloudfront/v3/home?region=${region}#/distributions/${distributionId}`;
}

export function apiUrl(api: Api | ApiGatewayV1Api, stack: Stack) {
    const {region} = stack;

    // @ts-ignore
    if (api?.restApiId) {
        // @ts-ignore
        return `https://${region}.console.${awsDomain(region)}/apigateway/home?region=${region}#/apis/${api.restApiId}/resources/`;
    }

    // @ts-ignore
    return `https://${region}.console.${awsDomain(region)}/apigateway/main/api-detail?api=${api?.httpApiId}&region=${region}`;
}

export function userPoolUrl(userPoolId: string, region: string) {

    if (region.startsWith('cn-')) {
        return `https://${region}.console.${awsDomain(region)}/cognito/v2/idp/user-pools/${userPoolId}/users?region=${region}`;
    }

    return `https://${region}.console.${awsDomain(region)}/cognito/v2/idp/user-pools/${userPoolId}/users?region=${region}`;
}

export function identityPoolUrl(cognitoIdentityPoolId: string, region: string) {
    if (region.startsWith('cn-')) {
        return `https://${region}.console.${region}/cognito/v2/identity/identity-pools/${cognitoIdentityPoolId}/user-statistics?region=${region}`;
    }

    return `https://${region}.console.${region}/cognito/v2/identity/identity-pools/${cognitoIdentityPoolId}/user-statistics?region=${region}`;
}

export function s3Url(bucketName: string, region: string) {
    if (region.startsWith('cn-')) {
        return `https://console.${awsDomain(region)}/s3/buckets/${bucketName}?region=${region}&tab=objects`;
    }

    return `https://s3.console.${awsDomain(region)}/s3/buckets/${bucketName}?region=${region}&tab=objects`;
}

export function bucketUrl(bucketName: string, region: string) {
    return s3Url(bucketName, region);
}

export function ddbUrl(tableName: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/dynamodbv2/home#table?initialTagKey=&name=${tableName}`;
}

export function sfUrl(stateMachineArn: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/states/home?region=${region}#/statemachines/view/${stateMachineArn}`;
}

export function executionUrl(executionArn: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/states/home?region=${region}#/v2/executions/details/${executionArn}`;
}

export function ddbExploreUrl(tableName: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/dynamodbv2/home?region=${region}#item-explorer?initialTagKey=&table=${tableName}`;
}

export function sqsUrl(queueName: string, region: string, account: string) {
    return `https://${region}.console.${awsDomain(region)}/sqs/v2/home?region=${region}#/queues/https%3A%2F%2Fsqs.${region}.amazonaws.com%2F${account}%2F${queueName}`;
}

export function busUrl(eventBusName: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/events/home?region=${region}#/eventbus/${eventBusName}`;
}

export function topicUrl(topicArn: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/sns/v3/home?region=${region}#/topic/${topicArn}`;
}

export function kdsUrl(streamName: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/kinesis/home?region=${region}#/streams/details/${streamName}/monitoring`;
}

export function distributionUrl(id: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/cloudfront/v3/home?#/distributions/${id}`;
}

export function route53Url(hostedZoneId: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/route53/v2/hostedzones#ListRecordSets/${hostedZoneId}`;
}

export function lambdaUrl(functionName: string, region: string) {
    return `https://${region}.console.${awsDomain(region)}/lambda/home?region=${region}#/functions/${functionName}`;
}

export function awsDomain(region: string) {

    if (region && region.startsWith('cn')) {
        return `amazonaws.cn`;
    }

    return `aws.amazon.com`;
}
