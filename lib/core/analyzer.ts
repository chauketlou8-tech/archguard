/**
 * Analyses the imports cleanly
  */

import importScanner from "../scanner/importScanner";
import import_type_classifier from "../utils/import_type_classifier";
import syntax_type_classifier from "../utils/syntax_type_classifier";
import type { obj } from "../types/obj";

export default function analyse() {
    //the map of the imports and their folder
    const analyticMap: Record<string, string[]> = importScanner();

    const builtins: obj[] = [];
    const external: obj[] = [];
    const internal: obj[] = [];

    for (const [key,values] of Object.entries(analyticMap)) {
        for (const value of values) {
            //extracts the import
            const match = value.match(/require\(['"](.+?)['"]\)|import\s+(?:.+?\s+from\s+)?['"](.+?)['"]/);

            if (match) {
                const import_name = match[1] ?? match[2];
                const source_file = key;
                const import_type = import_type_classifier(import_name);
                const import_syntax = syntax_type_classifier(match[0]);

                const obj = {
                    import_name,
                    source_file,
                    import_type,
                    import_syntax,
                }

                if (import_type === "internal") {
                    internal.push(obj)
                }
                else if (import_type === "external") {
                    external.push(obj)
                }
                else {
                    builtins.push(obj)
                }
            }
        }
    }

    return {
        builtins,
        external,
        internal,
    }
}