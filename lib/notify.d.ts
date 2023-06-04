export declare function feishu(json: Object): Promise<unknown>;
export declare function slack(json: Object): Promise<import("@slack/webhook").IncomingWebhookResult> | undefined;
export declare function wecom(json: Object): Promise<unknown> | undefined;
export declare function notify(options: Object, data: string): Promise<unknown>;
