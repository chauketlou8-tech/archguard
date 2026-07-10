import ArchGuardError from "./ArchGuardError";

export default class ScannerError extends ArchGuardError {
    constructor(statusCode: number = 409, path: string) {
        super(statusCode, path, `Unable to read file ${path}`);
    }
}