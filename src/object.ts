export function sortKeys(obj: any) {
    return Object.keys(obj).sort().reduce((result: any, key) => {
        result[key] = obj[key];
        return result;
    }, {});
}
