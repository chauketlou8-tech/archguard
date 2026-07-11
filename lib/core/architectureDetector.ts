/**
 * this file takes the scanned folder structure and build the architecture
 * the following are the types of architectures currently
 *
 * LAYERED
 * ---------------------------------------------------------------------------------------------------------------------
 * ✓ Dependencies flow only downward
 * ✓ No circular dependencies between layers
 * ✓ Presentation depends on Services
 * ✓ Services depend on Repositories
 * ✓ Repositories depend on Database
 * ✓ Lower layers never depend on higher layers
 * ✓ Layers have clear responsibilities
 * ✓ Few or no cross-layered shortcuts
 *
 * High Score Example:
 * Presentation
 *     ↓
 * Services
 *     ↓
 * Repositories
 *     ↓
 * Database
 *
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
 *
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
 *
 * example of relationshipMap is
 *
 * {
 *     "frontend -> pages": 1,
 *     "frontend -> components": 1,
 *     "frontend -> utils": 1,
 *
 *     "pages -> components": 12,
 *     "pages -> services": 8,
 *     "pages -> utils": 5,
 *
 *     "components -> ui": 15,
 *     "components -> utils": 7,
 *
 *     "services -> repositories": 10,
 *     "services -> utils": 3,
 *
 *     "repositories -> database": 9,
 *
 *     "controllers -> services": 11,
 *     "controllers -> models": 11,
 *     "controllers -> views": 11,
 *
 *     "views -> components": 14,
 *     "views -> ui": 8,
 *
 *     "auth -> shared": 6,
 *     "products -> shared": 9,
 *     "orders -> shared": 5,
 *     "payments -> shared": 4,
 *     "notifications -> shared": 3
 * };
 **/

import type { architecture } from "../types/architecture";
import LayeredGraph from "../classes/LayeredGraph"
import update_layered from "../utils/architecture/layered";

// @ts-ignore
export default function architectureDetector(relationshipMap: Record<string, number>): architecture {

    const scores: Record<string, number> = {};
    const graph: LayeredGraph = new LayeredGraph();

    const keys = Object.keys(relationshipMap);

    update_layered(keys, scores, graph);

    //for feature based

    //rule 1
}