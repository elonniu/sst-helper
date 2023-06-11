export function param(value: string | undefined | number, key: string, defaultValue: string | number | null = null) {

    if (value) {
        return value;
    }

    if (defaultValue !== null) {
        return defaultValue;
    }

    throw new Error(`${key} can not be empty`)
}

export function jsonResponse(json: object, statusCode: number = 200) {
    return {
        isBase64Encoded: false,
        statusCode,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(json)
    };
}

export function htmlResponse(html: string, statusCode: number = 200): object {

    return {
        isBase64Encoded: false,
        statusCode,
        headers: {
            'Content-Type': 'text/html',
            'Access-Control-Allow-Origin': '*',
        },
        body: html
    };

}
