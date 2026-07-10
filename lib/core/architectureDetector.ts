/*
this file takes the scanned folder structure and build the architecture
 */

import { obj } from "../types/obj";
import architectureScanner from "../scanner/architectureScanner";

export default function architectureBuilder(root: string, imports: obj[]) {

    const architecture = architectureScanner(root);

}