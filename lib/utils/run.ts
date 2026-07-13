/**
 * This function runs the engine of the whole app, id does everything
 */

import analyse from "../core/analyzer";
import architectureScanner from "../scanner/architectureScanner";
import checkLayers from "./checkLayers";
import architectureDetector from "../core/architectureDetector";
import dependencyBuilder from "../builder/dependencyBuilder";
import RuleEngine from "../core/ruleEngine";
import DirectedGraph from "../classes/DirectedGraph";

export default function runArchGuard(root: string) {
    const analysis = analyse();
    const scores: Record<string, number> = {};
    const LayeredGraph: DirectedGraph = new DirectedGraph();
    const FeaturedGraph: DirectedGraph = new DirectedGraph();

    const { layerLookup, relationshipMap } = architectureScanner(root);
    const keys = Object.keys(relationshipMap);

    checkLayers(analysis.internals, relationshipMap, layerLookup);
    const dependencies = dependencyBuilder(analysis.internals);

    for (const key of keys) {
        const [from, to] = key.split(" -> ");
        LayeredGraph.addEdge(from, to);
    }

    for (const dependency of dependencies) {
        FeaturedGraph.addEdge(dependency.sourceFeature, dependency.targetFeature);
    }

    const architecture = architectureDetector(relationshipMap, dependencies, scores, keys, LayeredGraph, FeaturedGraph);

    RuleEngine(architecture, keys, LayeredGraph, dependencies, FeaturedGraph);
}