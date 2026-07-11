import { ArchGuardTree } from "../classes/ArchGuardTree";
import path from "path"

export default function insertPathToTree(p: string, root: string, tree: ArchGuardTree) {
    const childNodes = path.relative(root, p).split(path.sep).filter(child => {
        if (child !== ".." && child !== ".")  return child;
    }).map(child => {
        return new ArchGuardTree(child)
    });

    let current = tree;
    childNodes.forEach(node => {

        let found = false;

        for (const child of current.children) {
            if (child.root === node.root) {
                current = child;
                found = true;
                break;
            }
        }

        if (!found) {
            current.children.push(node);

            current = node
        }
    });
}