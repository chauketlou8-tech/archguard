import checkLayers from "../utils/checkLayers";
import analyse from "./analyzer";

function ruleEngine() {
    const analysis = analyse();

    //checks the layers of the internal imports to generate the architecture
    // @ts-ignore
    checkLayers(analysis.internal);
}