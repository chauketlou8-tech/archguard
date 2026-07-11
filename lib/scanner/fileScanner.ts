/*
this file scans all the folders and returns all the files in those folders as objects with the folders as the keys

example

the file will return
 {
    "/my-api/src/controllers": [
        "/my-api/src/controllers/auth.controller.ts",
        "/my-api/src/controllers/user.controller.ts"
    ],

    "/my-api/src/services": [
        "/my-api/src/services/auth.service.ts",
        "/my-api/src/services/user.service.ts"
    ],

    "/my-api/src/repositories": [
        "/my-api/src/repositories/user.repository.ts"
    ],

    "/my-api/src/database": [
        "/my-api/src/database/prisma.ts"
    ]
}
 */

import projectScanner from "./projectScanner"
import scanner from "../utils/scanner"

export default function fileScanner() {
    const folders = projectScanner("C:\\Users\\chauk\\OneDrive\\Desktop\\Projects\\APWA")!;
    const folderFileMap: Record<string, string[]> = {}

    for (const folder of folders) {
        folderFileMap[folder] = scanner.scanFiles(folder);
    }

    return folderFileMap;
}