"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awsDomain = exports.lambdaUrl = exports.route53Url = exports.distributionUrl = exports.kdsUrl = exports.topicUrl = exports.busUrl = exports.sqsUrl = exports.ddbExploreUrl = exports.ddbUrl = exports.s3Url = exports.stackUrl = void 0;
function stackUrl(stack, app) {
    var region = app.region;
    return "https://".concat(region, ".console.").concat(awsDomain(app), "/cloudformation/home?region=").concat(region, "#/stacks/stackinfo?filteringStatus=active&filteringText=&viewNested=true&stackId=").concat(stack.stackId);
}
exports.stackUrl = stackUrl;
function s3Url(bucket, app) {
    if (app.region.startsWith('cn-')) {
        return "https://console.".concat(awsDomain(app), "/s3/buckets/").concat(bucket.bucketName, "?region=").concat(app.region, "&tab=objects");
    }
    return "https://s3.console.".concat(awsDomain(app), "/s3/buckets/").concat(bucket.bucketName, "?region=").concat(app.region, "&tab=objects");
}
exports.s3Url = s3Url;
function ddbUrl(table, app) {
    var region = app.region;
    return "https://".concat(region, ".console.").concat(awsDomain(app), "/dynamodbv2/home#table?initialTagKey=&name=").concat(table.tableName);
}
exports.ddbUrl = ddbUrl;
function ddbExploreUrl(table, app) {
    var region = app.region;
    return "https://".concat(region, ".console.").concat(awsDomain(app), "/dynamodbv2/home?region=").concat(region, "#item-explorer?initialTagKey=&table=").concat(table.tableName);
}
exports.ddbExploreUrl = ddbExploreUrl;
function sqsUrl(queue, app) {
    var region = app.region;
    return "https://".concat(region, ".console.").concat(awsDomain(app), "/sqs/v2/home?region=").concat(region, "#/queues/https%3A%2F%2Fsqs.").concat(app.region, ".amazonaws.com%2F").concat(app.account, "%2F").concat(queue.queueName);
}
exports.sqsUrl = sqsUrl;
function busUrl(bus, app) {
    var region = app.region;
    return "https://".concat(region, ".console.").concat(awsDomain(app), "/events/home?region=").concat(region, "#/eventbus/").concat(bus.eventBusName);
}
exports.busUrl = busUrl;
function topicUrl(topic, app) {
    var region = app.region;
    return "https://".concat(region, ".console.").concat(awsDomain(app), "/sns/v3/home?region=").concat(region, "#/topic/").concat(topic.topicArn);
}
exports.topicUrl = topicUrl;
function kdsUrl(streamName, app) {
    var region = app.region;
    return "https://".concat(region, ".console.").concat(awsDomain(app), "/kinesis/home?region=").concat(region, "#/streams/details/").concat(streamName, "/monitoring");
}
exports.kdsUrl = kdsUrl;
function distributionUrl(id, app) {
    var region = app.region;
    return "https://".concat(region, ".console.").concat(awsDomain(app), "/cloudfront/v3/home?#/distributions/").concat(id);
}
exports.distributionUrl = distributionUrl;
function route53Url(hostedZoneId, app) {
    var region = app.region;
    return "https://".concat(region, ".console.").concat(awsDomain(app), "/route53/v2/hostedzones#ListRecordSets/").concat(hostedZoneId);
}
exports.route53Url = route53Url;
function lambdaUrl(fn, app) {
    var region = app.region;
    return "https://".concat(region, ".console.").concat(awsDomain(app), "/lambda/home?region=").concat(region, "#/functions/").concat(fn.functionName);
}
exports.lambdaUrl = lambdaUrl;
function awsDomain(app) {
    var region = app.region;
    if (region && region.startsWith('cn')) {
        return "amazonaws.cn";
    }
    return "aws.amazon.com";
}
exports.awsDomain = awsDomain;
