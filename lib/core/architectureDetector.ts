/**
 * this file takes the scanned folder structure and build the architecture
 **/

import type {architecture} from "../types/architecture";
import DirectedGraph from "../classes/DirectedGraph"
import update_layered from "../architecture/layered";
import update_feature_based from "../architecture/featureBased";
import {dependency} from "../types/dependency";
import update_mvc from "../architecture/MVC";
import architectureBuilder from "../builder/architectureBuilder";

export default function architectureDetector(relationshipMap: Record<string, number>, dependencies: dependency[], scores: Record<string, number> = {}, keys: string[], LayeredGraph: DirectedGraph, FeaturedGraph: DirectedGraph): architecture {

    update_layered(keys, scores, LayeredGraph);
    update_feature_based(dependencies, scores, FeaturedGraph);
    update_mvc(keys, scores, LayeredGraph);

    const [type, score] = Object.entries(scores).reduce((best, current) =>
        current[1] > best[1] ? current : best
    );

    const total = Object.values(scores).reduce((sum, s) => sum + s, 0);
    const confidence = total > 0 ? Math.round((score / total) * 100) : 0;

    return architectureBuilder(type, confidence, relationshipMap, dependencies);
}