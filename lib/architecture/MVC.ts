/**
 * MVC
 *  ---------------------------------------------------------------------------------------------------------------------
 *  ✓ Controllers depend on Models
 * ✓ Controllers depend on Views
 * ✓ Views never depend on Controllers
 * ✓ Models never depend on Views
 * ✓ Models contain business/data logic
 * ✓ Controllers coordinate application flow
 * ✓ Views mainly handle presentation
 * ✓ Very little direct View ↔ Model communication
 *
 * High Score Example:
 * View
 *    ↓
 * Controller
 *  ↙      ↘
 * Model    View
 *
 * or simply
 *
 * View → Controller → Model
 *           ↓
 *         View
 *
 * A bad MVC would contain things like
 *
 * Model -> View ❌
 * View -> Model ❌
 * View -> View -> Model -> Controller
 **/

import LayeredGraph from "../classes/DirectedGraph";

export default function update_mvc(keys: string[], scores: Record<string, number>, graph: LayeredGraph) {

    /**
     * Rule 1: Controllers coordinate the application.
     *
     * Controllers are responsible for coordinating requests and should
     * depend on Models, Services and Views. They should not be depended
     * on by Models or Views.
     */
    for (const key of keys) {
        const [from, to] = key.split(" -> ");

        if (from === "controller" && (to === "model" || to === "service" || to === "view")) {
            scores["mvc"] = (scores["mvc"] ?? 0) + 1;
        }

        if ((from === "model" || from === "view") && to === "controller") {
            scores["mvc"]--;
        }
    }

    /**
     * Rule 2: Models must remain independent.
     *
     * Models contain business logic and data. They must not depend on
     * Controllers or Views.
     */
    for (const key of keys) {
        const [from, to] = key.split(" -> ");

        if (from === "model" && (to === "controller" || to === "view")) {
            scores["mvc"]--;
        }
    }

    /**
     * Rule 3: Views are presentation only.
     *
     * Views should focus on presentation and should not directly depend
     * on Models, Repositories or the Database.
     */
    for (const key of keys) {
        const [from, to] = key.split(" -> ");

        if (from === "view" && (to === "model" || to === "repository" || to === "database")) {
            scores["mvc"]--;
        } else if (from === "view" && (to === "ui" || to === "component")) {
            scores["mvc"] = (scores["mvc"] ?? 0) + 1;
        }
    }

    /**
     * Rule 4: Detect cyclic MVC dependencies.
     *
     * MVC should form a directed acyclic graph (DAG). Cyclic
     * dependencies between Controllers, Models and Views violate
     * the MVC architecture.
     */
    if (graph.hasCycle()) {
        scores["mvc"] -= 5;
    }
}