import fs from 'fs';
import path from "path"
import ignoredFolders from "../constants/excludedFolders"
import includedFiles from "../constants/includedFiles";

//This is the class that contains scanners for the whole project
class Scanner {
    //this function scans the whole project for all the folders
    scanFolder(start: string): string[] {
        const folders = [];

        const entries = fs.readdirSync(start, { withFileTypes: true })
        for (const entry of entries) {
            if (ignoredFolders.has(entry.name)) continue;

            const fullPath = path.join(start, entry.name);
            if (entry.isDirectory()) {
                folders.push(fullPath);
            }
        }

        return folders;
    }

    /*
    this function scans all the project folders for the files of the allowed file extensions
    examples of the file extensions are ".ts", ".tsx", ".js", ".jsx", ".java", ".py", ".rs"

    *** see ../constants/includedFiles for all allowed extensions
     */

    scanFiles(folder: string): string[] {
        const files: string[] = [];

        const entries = fs.readdirSync(folder, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(folder, entry.name);

            //ignore specific folders such as node_modules, ...etc
            if (ignoredFolders.has(entry.name)) continue;

            if (entry.isDirectory()) {
                files.push(...this.scanFiles(fullPath));
            } else if (entry.isFile()) {
                /*
                pushes the file only if it has an allowed file extension

                *** see ../constants/includedFiles for all allowed extensions
                 */
                if (includedFiles.has(path.extname(entry.name))) {
                    files.push(fullPath);
                }
            }
        }

        return files;
    }

    scanImport(file: string): string[] {
        const contents = fs.readFileSync(file, "utf8");
        const lines = contents.split("\n");
        const imports: string[] = []

        for (const line of lines) {
            if (line.startsWith("import ") || line.includes("require(")) {
                imports.push(line);
            }
        }

        return imports;
    }
}

export default new Scanner();