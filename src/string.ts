import {customAlphabet} from 'nanoid'

export function nanoid(len: number = 21) {

    const nanoid = customAlphabet(
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', len
    );

    return nanoid();

}
