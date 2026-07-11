/**
this is the actual engine of checking the architecture
it scans the project for the architecture and returns the relationship of all modules
 **/

import ArchGuardTreeBuilder from "../builder/treeBuilder"
import relationships from "../utils/relationships";


export default function architectureScanner(root: string): { relationshipMap: Record<string, number>, layerLookup: Record<string, string> } {
    const builder = ArchGuardTreeBuilder(root);
    const tree = builder.tree
    const layerLookup = builder.layerLookup;
    const relationshipMap: Record<string, number> = {};


    relationships(tree, relationshipMap);

    return {
        relationshipMap,
        layerLookup
    };
}