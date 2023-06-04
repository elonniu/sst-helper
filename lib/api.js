export function response(json) {
    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
    };
}
export function param(value, key, defaultValue = null) {
    if (value) {
        return value;
    }
    if (defaultValue !== null) {
        return defaultValue;
    }
    throw new Error(`${key} can not be empty`);
}
