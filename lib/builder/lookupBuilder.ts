import path from "path";

export default function lookupBuilder(files: string[], root: string) {
    const layerLookup: Record<string, string> = {}

    files.forEach((file) => {
        const parts = path.relative(root, file).split(path.sep);

        const srcIndex = parts.indexOf("src");

        if (srcIndex !== -1 && srcIndex + 1 < parts.length) {
            layerLookup[file] = parts[srcIndex + 1];
        }
    });

    return layerLookup;
}