class Element {
    constructor(element, priority) {
        this.element = element;
        this.priority = priority;
    }
}

class Heap {
    constructor(isMin = false) {
        this.items = [];
        this.size = 0;
        this.isMin = isMin;
    }

    parent(i) {
        return Math.floor((i-1) / 2);
    }

    leftChild(i) {
        return 2 * i + 1;
    }

    rightChild(i) {
        return 2 * i + 2;
    }

    getMax() {
        return this.items[0];
    }

    getHeap() {
        return this.items.slice(0, this.size).map(item => item.element);
    }

    swap(i, j) {
        const tmp = this.items[i];
        this.items[i] = this.items[j];
        this.items[j] = tmp;
    }

    siftUp(i) {
        while (i > 0 && (this.isMin
            ? this.items[this.parent(i)].priority > this.items[i].priority
            : this.items[this.parent(i)].priority < this.items[i].priority)) {
            this.swap(this.parent(i), i);
            i = this.parent(i);
        }
    }

    siftDown(i) {
        let maxIndex = i;

        const l = this.leftChild(i);
        if (l <= this.size && (this.isMin
            ? this.items[maxIndex].priority > this.items[l].priority
            : this.items[maxIndex].priority < this.items[l].priority)) {
            maxIndex = l;
        }

        const r = this.rightChild(i);
        if (r <= this.size && (this.isMin
            ? this.items[maxIndex].priority > this.items[r].priority
            : this.items[maxIndex].priority < this.items[r].priority)) {
            maxIndex = r;
        }

        if (i !== maxIndex) {
            this.swap(i, maxIndex);
            this.siftDown(maxIndex);
        }
    }

    insert(item, p = null) {
        if (p === null) {
            p = item;
        }

        const elem = new Element(item, p);

        this.size += 1;
        this.items[this.size - 1] = elem;
        this.siftUp(this.size - 1);

        return elem;
    }

    extractMax() {
        const result = this.items[0];

        this.items[0] = this.items[this.size - 1];
        this.size -= 1;
        this.siftDown(0);

        return result;
    }

    remove(item) {
        const i = this.items.findIndex(el => el.element === item);
        this.items[i].priority = this.isMin ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
        this.siftUp(i);
        this.extractMax();
    }

    changePriority(item, p) {
        const i = this.items.findIndex(el => el.element === item);
        const oldp = this.items[i].priority;
        this.items[i].priority = p;

        if (this.isMin ? p < oldp : p > oldp) {
            this.siftUp(i);
        } else {
            this.siftDown(i);
        }
    }

    isEmpty() {
        return this.size === 0;
    }
}

module.exports = Heap;