import type { obj } from "../types/obj";
import type { dependency } from "../types/dependency";
import resolveImport from "../utils/resolveImport";
import path from "path"

export default function dependencyBuilder(internals: obj[]): dependency[] {
    const deps: dependency[] = []

    for (const object of internals) {
        const sourceFile = object.source_file;
        const targetFile = resolveImport(path.resolve(path.dirname(object.source_file), object.import_name));

        if (!targetFile) continue;

        const sourceFeature = path.basename(path.dirname(sourceFile));
        const sourceLayer   = path.parse(sourceFile).name;

        const targetFeature = path.basename(path.dirname(targetFile));
        const targetLayer   = path.parse(targetFile).name;

        const dep = {
            sourceFeature,
            sourceLayer,
            targetFeature,
            targetLayer,
        }

        deps.push(dep);
    }

    return deps
}