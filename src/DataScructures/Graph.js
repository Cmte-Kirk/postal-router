class Graph {
    constructor() {
        this.nodes = [];
        this.edges = new Map();
    }

    addNode(node) {
        if (this.nodes.indexOf(node) == -1) {
            this.nodes.push(node);
            this.edges.set(node, []);
        }
    }

    addEdge(node1, node2, weight = 1) {
        this.edges.get(node1).push({ node: node2, weight });
        this.edges.get(node2).push({ node: node1, weight });
    }

    addDirectedEdge(node1, node2, weight = 1) {
        this.edges.get(node1).push({ node: node2, weight });
    }

    getNodes() {
        return this.nodes;
    }

    getNeighbors(node) {
        return this.edges.get(node);
    }

    display(prop) {
        let graph = "";
        this.nodes.forEach(node => {
            graph += (prop ? node[prop] : node) + " -> " + this.edges.get(node).map(n => prop ? n.node[prop] : n.node).join(", ") + "\n";
        });
        console.log(graph);
    }
}

module.exports = Graph;