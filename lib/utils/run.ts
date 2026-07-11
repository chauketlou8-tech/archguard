/**
 * This function runs the engine of the whole app, id does everything
 */

import analyse from "../core/analyzer";
import architectureScanner from "../scanner/architectureScanner";
import checkLayers from "./checkLayers";
import architectureDetector from "../core/architectureDetector";

export default function runArchGuard(root: string) {
    const analysis = analyse();

    const { layerLookup, relationshipMap } = architectureScanner(root);

    checkLayers(analysis.internal, relationshipMap, layerLookup);

    const architecture = architectureDetector(relationshipMap);

    /*const violations = ruleEngine(
        architecture,
        relationshipMap,
        analysis
    );

    reporter(violations);*/
}