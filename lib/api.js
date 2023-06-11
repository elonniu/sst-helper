export function param(value, key, defaultValue = null) {
    if (value) {
        return value;
    }
    if (defaultValue !== null) {
        return defaultValue;
    }
    throw new Error(`${key} can not be empty`);
}
export function jsonResponse(json, statusCode = 200) {
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
export function htmlResponse(html, statusCode = 200) {
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
