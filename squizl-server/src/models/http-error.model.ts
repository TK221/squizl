export class HttpError extends Error {
    public httpStatus: number;

    constructor (msg: string, httpStatus: number) {
        super(msg);
        if (httpStatus < 1000) this.httpStatus = httpStatus;
        else this.httpStatus = 500;
    }
}
