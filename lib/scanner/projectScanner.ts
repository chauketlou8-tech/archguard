/*
this file scans the whole project for the folders and returns a list of the folders

example
the file will return
[
    "/my-api/src/controllers",
    "/my-api/src/services",
    "/my-api/src/repositories",
    "/my-api/src/database"
]
 */

import scanner from "../utils/scanner"

export default function ScanFolders(projectRoot: string) {
    //const projectRoot = process.cwd();
    return scanner.scanFolder(projectRoot)
}