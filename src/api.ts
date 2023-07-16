import {sortKeys} from "./object.js";

export function param(value: string | undefined | number, key: string, defaultValue: string | number | null = null) {

    if (value) {
        return value;
    }

    if (defaultValue !== null) {
        return defaultValue;
    }

    throw new Error(`${key} can not be empty`)
}

export function jsonResponse(json: object, statusCode: number = 200, headers: object = {}, sort: boolean = true): object {

    json = sort ? sortKeys(json) : json;

    return {
        isBase64Encoded: false,
        statusCode,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            ...headers,
        },
        body: JSON.stringify(json)
    };
}

export function htmlResponse(html: string, statusCode: number = 200, headers: object = {}): object {

    return {
        isBase64Encoded: false,
        statusCode,
        headers: {
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*',
            ...headers,
        },
        body: html
    };

}
