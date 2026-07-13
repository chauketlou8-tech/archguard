import type { architecture } from "../types/architecture";
import type { violation } from "../types/violation";
import reporter from "../reporter/reporter";
import DirectedGraph from "../classes/DirectedGraph";
import type { dependency } from "../types/dependency";

export default function RuleEngine(architecture: architecture, keys: string[], LayeredGraph: DirectedGraph, dependencies: dependency[], FeaturedGraph: DirectedGraph) {

    switch (architecture.type) {
        case "layered": {

            for (const key of keys) {
                const upperLayer = key.split(" -> ")[0];

                const flowUpwards = (keys.every(k => {
                    const lowerLayer = k.split(" -> ")[1];
                    return lowerLayer === upperLayer;
                }));

                if (flowUpwards) {
                    const violation: violation = {
                        rule: "upward flow",
                        severity: "error",
                        message: "A downward folder/file depend on an upward folder"
                    }

                    reporter.report(violation);
                }
            }

            if (LayeredGraph.hasCycle()) {
                const cycle = LayeredGraph.findCycle()!;

                const violation: violation = {
                    rule: "layered.no-cycles",
                    severity: "error",
                    message: `Cycle detected: ${cycle.join(" -> ")}`
                }

                reporter.report(violation);
            }

            keys.forEach((key) => {
                const [upperLayer, lowerLayer] = key.split(" -> ");

                for (const k of keys) {
                    const [ul, ll] = k.split(" -> ");

                    if (ul === lowerLayer) {
                        for (const ky of keys) {
                            const [upperLay, lowerLay] = ky.split(" -> ");
                            if (upperLayer === upperLay && ll === lowerLay) {
                                const violation: violation = {
                                    rule: "skipped layer dependency",
                                    severity: "error",
                                    message: `${upperLayer} skipped ${lowerLayer} and depends directly on ${ll}.`
                                }

                                reporter.report(violation);
                                break;
                            }
                        }
                    }
                }
            });
            break;
        }

        case "feature-based": {
            //Rule 1
            for (const dependency of dependencies) {
                if (dependency.sourceFeature !== dependency.targetFeature && dependency.targetFeature !== "shared") {
                    const violation: violation = {
                        rule: "feature dependent on another feature",
                        severity: "error",
                        message: `${dependency.sourceFeature} depends on ${dependency.targetFeature}.`,
                    }

                    reporter.report(violation);
                }
            }

            //Rule 2
            if (FeaturedGraph.hasCycle()) {
                const cycle = FeaturedGraph.findCycle()!;

                const violation: violation = {
                    rule: "featured.no-cycles",
                    severity: "error",
                    message: `Cycle detected: ${cycle.join(" -> ")}`
                }

                reporter.report(violation);
            }

            //Rule 3
            const featureDeps = new Map<string, Set<string>>();

            for (const dependency of dependencies) {
                if (dependency.targetFeature !== dependency.sourceFeature && dependency.targetFeature !== "shared") {
                    if (!featureDeps.has(dependency.sourceFeature)) {
                        featureDeps.set(dependency.sourceFeature, new Set());
                    }

                    featureDeps.get(dependency.sourceFeature)!.add(dependency.targetFeature);
                }
            }

            for (const [feature, targets] of featureDeps.entries()) {
                if (targets.size >= 4) {
                    const violation: violation = {
                        rule: "feature.max-coupling",
                        severity: "warning",
                        message: `Feature '${feature}' depends on ${targets.size} other features.`
                    };

                    reporter.report(violation);
                }
            }
            break;
        }

        case "mvc": {

            for (const key of keys) {
                const [from, to] = key.split(" -> ");

                if (from === "controller" && to !== "model" && to !== "service" && to !== "view") {
                    reporter.report({
                        rule: "mvc.invalid-controller-dependency",
                        severity: "error",
                        message: `Controller depends on '${to}', which is not a valid MVC dependency.`
                    });
                }

                if (from === "view" && to === "controller") {
                    reporter.report({
                        rule: "mvc.view-controller-dependency",
                        severity: "error",
                        message: "Views must not depend on Controllers."
                    });
                }

                if (from === "model" && (to === "controller" || to === "view")) {
                    reporter.report({
                        rule: "mvc.model-dependency",
                        severity: "error",
                        message: `Models must not depend on ${to}.`
                    });
                }

                if (from === "view" && (to === "repository" || to === "database")) {
                    reporter.report({
                        rule: "mvc.view-data-access",
                        severity: "error",
                        message: `Views must not depend directly on ${to}.`
                    });
                }
            }

            if (LayeredGraph.hasCycle()) {
                const cycle = LayeredGraph.findCycle()!;

                reporter.report({
                    rule: "mvc.no-cycles",
                    severity: "error",
                    message: `Cycle detected: ${cycle.join(" -> ")}`
                });
            }

            break;
        }
    }

}
