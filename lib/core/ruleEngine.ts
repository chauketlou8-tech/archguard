import checkLayers from "../utils/checkLayers";
import analyse from "./analyzer";
import architectureScanner from "../scanner/architectureScanner";

function ruleEngine(root: string) {
    const analysis = analyse();

    const { layerLookup, relationshipMap } = architectureScanner(root);

    //checks the layers of the internal imports to generate the architecture
    checkLayers(analysis.internal, relationshipMap, layerLookup);
}