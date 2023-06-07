export function jsonParseRecursive(obj: any) {

    for (const key in obj) {
        if (typeof obj[key] === "string") {
            try {
                obj[key] = JSON.parse(obj[key]);
            } catch (e) {
            }
        } else if (typeof obj[key] === "object") {
            jsonParseRecursive(obj[key]);
        }
    }

}
