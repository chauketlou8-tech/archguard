/**
 this file takes the imports and the relationship map and studies the right architecture layers and returns an object/array (not really sure for now, probably an array) of the layers
 **/


import { obj } from "../types/obj";
import path from "path"

export default function checkLayers(imports: obj[], relationshipMap: Record<string, number>, layerLookup: Record<string, string>): void {
    for (const im of imports) {
        const sourceLayer = layerLookup[im.source_file];
        const targetFile = path.resolve(path.dirname(im.source_file), im.import_name);
        const targetLayer = layerLookup[targetFile];

        if (!relationshipMap[`${sourceLayer} -> ${targetLayer}`]){
            relationshipMap[`${sourceLayer} -> ${targetLayer}`] = 1
        }
        else {
            relationshipMap[`${sourceLayer} -> ${targetLayer}`]++;
        }

        console.log(im.source_file);
        console.log(targetFile);
    }
}