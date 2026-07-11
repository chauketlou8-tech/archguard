/**
 this file takes the imports and the relationship map and studies the right architecture layers and returns an object/array (not really sure for now, probably an array) of the layers
 **/


import { obj } from "../types/obj";
import path from "path"
import resolveImport from "./resolveImport";

export default function checkLayers(imports: obj[], relationshipMap: Record<string, number>, layerLookup: Record<string, string>): void {
    for (const im of imports) {
        const sourceLayer = layerLookup[im.source_file];
        const targetFile = resolveImport(path.resolve(path.dirname(im.source_file), im.import_name));

        if (!targetFile) {
            continue;
        }

        const targetLayer = layerLookup[targetFile];

        if (!targetLayer) {
            continue;
        }

        relationshipMap[`${sourceLayer} -> ${targetLayer}`] = (relationshipMap[`${sourceLayer} -> ${targetLayer}`] ?? 0) + 1;
    }
}