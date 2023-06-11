// create export function milliseconds
export function ms() {
    return Number(Date.now().toString());
}

// create export function seconds
export function s() {
    return Number(Date.now().toString().slice(0, 10));
}

// create export function minutes
export function m() {
    return Number(Date.now().toString().slice(0, 10)) / 60;
}

// create export function hours
export function h() {
    return Number(Date.now().toString().slice(0, 10)) / 3600;
}

// create export function days
export function d() {
    return Number(Date.now().toString().slice(0, 10)) / 86400;
}
