import LayeredGraph from "../../classes/LayeredGraph"

export default function update_layered(keys: string[], scores: Record<string, number>, graph: LayeredGraph) {
    /**
     * Rule 1: Dependencies flow only downward.
     *
     * A layer that already acts as a dependency (appears on the right-hand side)
     * must not later depend on another layer itself. This prevents dependency
     * flow from reversing direction.
     */

    for (const key of keys) {
        const upperLayer = key.split(" -> ")[0];

        if (keys.every(k => {
            const lowerLayer = k.split(" -> ")[1];
            return lowerLayer !== upperLayer;
        })) {
            scores["layered"] = (scores["layered"] ?? 0) + 1;
        }
    }

    // Build graph once
    for (const key of keys) {
        const [from, to] = key.split(" -> ");
        graph.addEdge(from, to);
    }

    /**
     * Rule 2: Detect cyclic dependencies.
     *
     * A layered architecture must form a directed acyclic graph (DAG).
     * If following dependency paths leads back to the starting layer,
     * the architecture contains a cycle and violates the layered model.
     */
    if (graph.hasCycle()) {
        scores["layered"]--;
    }

    /**
     * Rule 3: Detect skipped-layer dependencies.
     *
     * A direct dependency is considered a violation if an indirect path
     * between the same two layers already exists.
     *
     * Example:
     *
     * frontend -> pages
     * pages -> components
     * frontend -> components   // violation
     *
     * General form:
     *
     * A -> B
     * B -> C
     * A -> C   // violation
     */
    keys.forEach((key) => {
        //A -> B
        const [upperLayer, lowerLayer] = key.split(" -> ");

        //take B and look for B -> C
        for (const k of keys) {
            // B -> C
            const [ul, ll] = k.split(" -> ");

            //if B = B
            if (ul === lowerLayer) {
                //take C and look for A -> C
                for (const ky of keys) {
                    //A -> C
                    const [upperLay, lowerLay] = ky.split(" -> ");
                    // if A = A and C = C
                    if (upperLayer === upperLay && ll === lowerLay) {
                        scores["layered"]--;
                        break;
                    }
                }
            }
        }
    });
}