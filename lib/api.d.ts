export declare function param(value: string | undefined | number, key: string, defaultValue?: string | number | null): string | number;
export declare function jsonResponse(json: object): {
    isBase64Encoded: boolean;
    statusCode: number;
    headers: {
        'Content-Type': string;
        'Access-Control-Allow-Origin': string;
    };
    body: string;
};
export declare function htmlResponse(html: string): object;
