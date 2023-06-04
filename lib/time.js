export function ms() {
    return Number(Date.now().toString());
}
export function s() {
    return Number(Date.now().toString().slice(0, 10));
}
