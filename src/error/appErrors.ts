export class appError {
    public readonly message: string

    public readonly errorCode: number

    constructor (message: string, errorCode = 400) {
        this.errorCode = errorCode
        this.message = message
    }
}