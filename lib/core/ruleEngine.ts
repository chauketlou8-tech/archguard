import checkLayers from "../utils/checkLayers";
import analyse from "./analyzer";

function ruleEngine() {
    const analysis = analyse();

    //checks the layers of the internal imports to generate the architecture
    checkLayers(analysis.internal);
}