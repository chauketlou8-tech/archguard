/**
This function builds the ArchGuard tree and returns it
 **/

import insertPathToTree from "../utils/insertPathToTree";
import { ArchGuardTree } from "../classes/ArchGuardTree";
import fileScanner from "../scanner/fileScanner";
import folderScanner from "../scanner/projectScanner"
import path from "path";

export default function ArchGuardTreeBuilder(root: string): ArchGuardTree {
    const folders = folderScanner(root);
    const filesMap: Record<string, string[]> = fileScanner();
    const projectName = path.basename(path.dirname(folders[0]));
    const tree = new ArchGuardTree(projectName);

    for (const filePath of Object.values(filesMap).flat()) {
        insertPathToTree(filePath, root, tree)
    }

    return tree;
}