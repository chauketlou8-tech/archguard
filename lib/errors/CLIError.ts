import ArchGuardError from "./ArchGuardError";

export default class CLIError extends ArchGuardError {
    constructor(statusCode: number, path: string, message: string) {
        super(statusCode, path, message);
    }
}