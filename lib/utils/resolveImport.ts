import path from "path"
import includedFiles from "../constants/includedFiles";
import fs from "fs";

export default function resolveImport(base: string): string | undefined {
    const extensions = [...includedFiles]
    for (const ext of extensions) {
        const candidate = base + ext;
        if (fs.existsSync(candidate)) {
            return candidate;
        }
    }

    for (const ext of extensions) {
        const candidate = path.join(base, "index" + ext);
        if (fs.existsSync(candidate)) {
            return candidate;
        }
    }

    return undefined;
}