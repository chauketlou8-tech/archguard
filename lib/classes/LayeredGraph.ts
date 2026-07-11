export default class DirectedGraph {
    public adjacencyList: Map<string, string[]>;

    constructor() {
        this.adjacencyList = new Map();
    }

    addVertex(vertex: string) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    addEdge(from: string, to: string) {
        if (!this.adjacencyList.has(from)) this.addVertex(from);
        if (!this.adjacencyList.has(to)) this.addVertex(to);
        this.adjacencyList.get(from)!.push(to);
    }

    private dfs(vertex: string, visited: Set<string>, recStack: Set<string>): boolean {
        if (!visited.has(vertex)) {
            visited.add(vertex);
            recStack.add(vertex);

            for (const neighbor of this.adjacencyList.get(vertex) || []) {
                if (!visited.has(neighbor) && this.dfs(neighbor, visited, recStack)) {
                    return true;
                } else if (recStack.has(neighbor)) {
                    return true;
                }
            }
        }
        recStack.delete(vertex);
        return false;
    }

    hasCycle(): boolean {
        const visited = new Set<string>();
        const recStack = new Set<string>();

        for (const vertex of this.adjacencyList.keys()) {
            if (this.dfs(vertex, visited, recStack)) {
                return true;
            }
        }
        return false;
    }
}
