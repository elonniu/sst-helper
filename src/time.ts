import moment from "moment";

// create export function milliseconds
export function ms() {
    return Number(Date.now().toString());
}

// create export function seconds
export function s(utcOffset = 8) {
    return Number(moment().utcOffset(utcOffset).format('YYYYMMDDHHmmss'));
}

// create export function minutes
export function m(utcOffset = 8) {
    return Number(moment().utcOffset(utcOffset).format('YYYYMMDDHHmm'));
}

// create export function hours
export function h(utcOffset = 8) {
    return Number(moment().utcOffset(utcOffset).format('YYYYMMDDHH'));
}

// create export function days
export function d(utcOffset = 8) {
    return Number(moment().utcOffset(utcOffset).format('YYYYMMDD'));
}
