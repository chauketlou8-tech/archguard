/*
this file scans all the files in the folder tree for all the imports and returns all the files with imports with the files as the keys

example

suppose

// auth.controller.ts
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

and

// auth.service.ts
import UserRepository from "../repositories/user.repository";

then the file will return shape

{
    "/my-api/src/controllers/auth.controller.ts": [
        'import AuthService from "../services/auth.service";',
        'import UserService from "../services/user.service";'
    ],

    "/my-api/src/controllers/user.controller.ts": [
        'import UserService from "../services/user.service";'
    ],

    "/my-api/src/services/auth.service.ts": [
        'import UserRepository from "../repositories/user.repository";'
    ],

    "/my-api/src/services/user.service.ts": [],

    "/my-api/src/repositories/user.repository.ts": [
        'import prisma from "../database/prisma";'
    ],

    "/my-api/src/database/prisma.ts": []
}
 */

import scanner from "../utils/scanner"
import fileScanner from "./fileScanner";

export default function importScanner() {
    const folderFileMap = fileScanner();
    const importMap : Record<string, string[]> = {}

    for (const folder of Object.keys(folderFileMap)) {
        const files = folderFileMap[folder];

        for (const file of files) {
            importMap[file] = scanner.scanImport(file);
        }
    }

    return importMap;
}