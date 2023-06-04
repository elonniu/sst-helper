export declare function response(json: Object): {
    statusCode: number;
    headers: {
        "Content-Type": string;
    };
    body: string;
};
export declare function param(value: string | undefined | number, key: string, defaultValue?: string | number | null): string | number;
