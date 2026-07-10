export default class ArchGuardError extends Error {
    public statusCode: number;
    public path: string;

    constructor(statusCode: number, path: string, message: string) {
        super(message);

        this.statusCode = statusCode;
        this.path = path;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}