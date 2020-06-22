const Heap = require('./heap');

class PriorityQueue {
    constructor(isMin = false) {
        this.items = new Heap(isMin);
    }

    enqueue(item, priority) {
        return this.items.insert(item, priority);
    }

    dequeue() {
        return this.items.extractMax();
    }

    peek() {
        return this.items.getMax();
    }

    isEmpty() {
        return this.items.isEmpty();
    }

    changePriority(item, priority) {
        this.items.changePriority(item, priority);
    }
}

module.exports = PriorityQueue;