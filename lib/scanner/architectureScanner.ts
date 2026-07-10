/**
this is the actual engine of checking the architecture
it scans the project for the architecture and returns the relationship of all modules
 **/

import ArchGuardTreeBuilder from "../builder/treeBuilder"
import relationships from "../utils/relationships";


export default function architectureScanner(root: string): Record<string, number> {
    const tree = ArchGuardTreeBuilder(root)
    const relationshipMap: Record<string, number> = {};


    relationships(tree, relationshipMap);

    return relationshipMap;
}