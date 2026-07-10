import {ArchGuardTree} from "../classes/ArchGuardTree";

export default function relationships(node: ArchGuardTree, relationshipMap: Record<string, number>) {
    if (!node.children.length) return;

    for (const child of node.children) {
        const key = `${node.root} -> ${child.root}`;
        relationshipMap[key] = (relationshipMap[key] ?? 0) + 1;

        relationships(child, relationshipMap);
    }
}