
import { HttpError } from './http-error.model';

export class Success<T> {
    readonly value: T;

    constructor (value: T) {
        this.value = value;
    }

    isSucc (): this is Success<T> {
        return true;
    }

    isFail (): this is Fail<T> {
        return false;
    }
}

export class Fail<T> {
    readonly value: HttpError;

    constructor (value: HttpError) {
        this.value = value;
    }

    isSucc (): this is Success<T> {
        return false;
    }

    isFail (): this is Fail<T> {
        return true;
    }
}

export type Result<T> = Success<T> | Fail<T>;

export const success = <T>(t: T): Result<T> => {
    return new Success(t);
};

export const fail = <T>(err: HttpError): Result<T> => {
    return new Fail<T>(err);
};
