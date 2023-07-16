export function sortKeys(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(sortKeys);
    }

    return Object.keys(obj)
        .sort()
        .reduce((result: any, key) => {
            result[key] = sortKeys(obj[key]);
            return result;
        }, {});
}
