import type { architecture } from "../types/architecture";
import type { dependency } from "../types/dependency";

export default function architectureBuilder(type: string, confidence: number, relationshipMap: Record<string, number>, dependencies: dependency[]): architecture {

    const result: architecture = {
        type,
        confidence,
    };

    switch (type) {
        case "layered": {
            const layers = new Set<string>();

            for (const key of Object.keys(relationshipMap)) {
                const [from, to] = key.split(" -> ");
                layers.add(from);
                layers.add(to);
            }

            result.layers = [...layers];
            break;
        }

        case "feature-based": {
            const features = new Set<string>();

            for (const dependency of dependencies) {
                features.add(dependency.sourceFeature);
                features.add(dependency.targetFeature);
            }

            result.features = [...features];
            break;
        }

        case "mvc": {
            const layers = new Set<string>();

            for (const key of Object.keys(relationshipMap)) {
                const [from, to] = key.split(" -> ");

                if (["controllers", "models", "views"].includes(from)) {
                    layers.add(from);
                }

                if (["controllers", "models", "views"].includes(to)) {
                    layers.add(to);
                }
            }

            result.layers = [...layers];
            break;
        }
    }

    return result;
}