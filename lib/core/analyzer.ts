// Analyses the imports cleanly
import importScanner from "../scanner/importScanner";

export default function analyse() {
    //the map of the imports and their folder
    const analyticMap: Record<string, string[]> = importScanner();

    const builtins: Record<string, string[]> = {};
    const external: Record<string, string[]> = {};
    const internal: Record<string, string[]> = {};

    for (const value of Object.values(analyticMap)) {
        console.log(value)
    }
}