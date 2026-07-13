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

    private dfs(vertex: string, visited: Set<string>, recStack: Set<string>, parent: Map<string,string>): string[] | null {
        visited.add(vertex);
        recStack.add(vertex);

        for (const neighbor of this.adjacencyList.get(vertex) || []) {
            if (!visited.has(neighbor)) {
                parent.set(neighbor, vertex);
                const cycle = this.dfs(neighbor, visited, recStack, parent);
                if (cycle) return cycle;
            } else if (recStack.has(neighbor)) {
                const cycle: string[] = [];
                let current: string | undefined = vertex;
                cycle.push(neighbor);
                while (current && current !== neighbor) {
                    cycle.push(current);
                    current = parent.get(current);
                }
                cycle.push(neighbor);
                cycle.reverse();
                return cycle;
            }
        }

        recStack.delete(vertex);
        return null;
    }

    findCycle(): string[] | null {
        const visited = new Set<string>();
        const recStack = new Set<string>();
        const parent = new Map<string,string>();

        for (const vertex of this.adjacencyList.keys()) {
            if (!visited.has(vertex)) {
                const cycle = this.dfs(vertex, visited, recStack, parent);
                if (cycle) return cycle;
            }
        }
        return null;
    }

    hasCycle(): boolean {
        return this.findCycle() !== null;
    }
}