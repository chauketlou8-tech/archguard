//this function checks if an import if internal, external or built-in

import { builtinModules } from "module";

export default function classifyModule(name: string) {
    if (name.startsWith("./") || name.startsWith("../") || name.startsWith("/")) {
        return "internal";
    }
    if (builtinModules.includes(name)) {
        return "built-in";
    }
    return "external";
}