import fs from "fs"
import path from "path"

export default function createConfig(): void {
    const content = {
        "architecture": "",
        "ignore": [],
        "rules": {},
        "reporter": ""
    }

    // @ts-ignore
    fs.writeFileSync(path.resolve(process.cwd(), "archguard.config.json"), content);
}