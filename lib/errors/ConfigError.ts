import ArchGuardError from "./ArchGuardError";

export default class ConfigError extends ArchGuardError {
    constructor(statusCode: number, path: string, message: string) {
        super(statusCode, path, message);
    }
}