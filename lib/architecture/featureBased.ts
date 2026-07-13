/**
 * Feature-Based
 * ---------------------------------------------------------------------------------------------------------------------
 * ✓ Code is grouped by feature rather than technical role
 * ✓ Each feature is mostly self-contained
 * ✓ Features communicate through shared modules only
 * ✓ Very few direct feature-to-feature dependencies
 * ✓ Shared utilities are reused across features
 * ✓ No large "god" modules imported everywhere
 * ✓ Internal feature structure is consistent
 *
 * High Score Example:
 * auth
 *  ├── components
 *  ├── services
 *  ├── utils
 *
 * products
 *  ├── components
 *  ├── services
 *  ├── utils
 *
 * orders
 *  ├── components
 *  ├── services
 *  ├── utils
 *
 * shared
 *  ├── api
 *  ├── ui
 *  └── utils
 *
 *  a bad feature architecture is something like
 *
 *  auth -> products
 * products -> orders
 * orders -> auth
 **/

import { dependency } from "../types/dependency";
import FeaturedGraph from "../classes/DirectedGraph"

export default function update_feature_based(dependencies: dependency[], scores: Record<string, number>, graph: FeaturedGraph) {

    /**
     * Rule 1: Features should remain independent.
     *
     * A feature should primarily depend on itself or on the shared module.
     * Direct dependencies between unrelated features reduce modularity
     * and indicate that the project is drifting away from a feature-based
     * architecture.
     */
    for (const dependency of dependencies) {
        if (dependency.sourceFeature === dependency.targetFeature || dependency.targetFeature === "shared") {
            scores["feature-based"] = (scores["feature-based"] ?? 0) + 1;
        } else {
            scores["feature-based"] = (scores["feature-based"] ?? 0) - 1;
        }
    }

    /**
     * Rule 2: Detect cyclic feature dependencies.
     *
     * A feature-based architecture should form a directed acyclic graph (DAG)
     * between features. If following feature dependencies eventually leads
     * back to the starting feature, the architecture contains a cycle and
     * violates feature independence.
     */
    if (graph.hasCycle()) {
        scores["feature-based"] -= 5;
    }

    /**
     * Rule 3: Shared module should remain independent.
     *
     * The shared module provides reusable functionality that every feature
     * may depend on. The shared module itself should not depend on any
     * individual feature, otherwise it becomes coupled to application logic.
     */

    for (const dependency of dependencies) {
        if (dependency.sourceFeature === "shared") {
            scores["feature-based"]--;
        }
    }

    /**
     * Rule 4: Minimize feature coupling.
     *
     * Features should communicate as little as possible with one another.
     * A large number of cross-feature dependencies indicates strong coupling,
     * making the project harder to maintain and reducing the benefits of a
     * feature-based architecture.
     */

    const featureDeps = new Map<string, Set<string>>();

    for (const dependency of dependencies) {
        if (dependency.targetFeature !== dependency.sourceFeature && dependency.targetFeature !== "shared") {
            if (!featureDeps.has(dependency.sourceFeature)) {
                featureDeps.set(dependency.sourceFeature, new Set());
            }

            featureDeps.get(dependency.sourceFeature)!.add(dependency.targetFeature);
        }
    }

    for (const targets of featureDeps.values()) {
        if (targets.size >= 4) {
            scores["feature-based"] -= targets.size;
        }
    }
}