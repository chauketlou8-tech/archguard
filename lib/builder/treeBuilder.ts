/**
This function builds the ArchGuard tree and returns it
 **/

import insertPathToTree from "../utils/insertPathToTree";
import {ArchGuardTree} from "../classes/ArchGuardTree";
import fileScanner from "../scanner/fileScanner";
import folderScanner from "../scanner/projectScanner"
import path from "path";
import lookupBuilder from "./lookupBuilder";

export default function ArchGuardTreeBuilder(root: string): { tree: ArchGuardTree, layerLookup: Record<string, string> } {
    const folders = folderScanner(root);
    const filesMap: Record<string, string[]> = fileScanner();
    const projectName = path.basename(path.dirname(folders[0]));
    const tree = new ArchGuardTree(projectName);
    const files = Object.values(filesMap).flat();

    for (const filePath of files) {
        insertPathToTree(filePath, root, tree);
    }

    const layerLookup = lookupBuilder(files, root);

    return {
        tree,
        layerLookup,
    }
}