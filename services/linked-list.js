/**
 * Two classes to make up a Linked List. One is the nodes on the list.
 * The second is the list itself
 * @author Shane Panchot
 */
class ListNode {
    /**
     * Constructs a node to be added to the list.
     * @param {*} data - The data to be added to a Linked List 
     */
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}


class LinkedList {
    /**
     * Constructs a new linked list with the head as the ListNode passed.
     * Null parameter creates an empty list.
     * @param {ListNode|null} head - ListNode to be the Head. Null creates an empty list.
     */
    constructor(head = null) {
        this.head = head;
    }

    /**
     * Empties the list.
     */
    clear() {
        this.head = null;
    }

    /**
     * Returns the size of the list.
     */
    size() {
        let size = 0;
        let node = this.head;
        while (node) {
            size++;
            node = node.next;
        }
        return size;
    }

    /**
     * @returns - The first element in the list.
     */
    getFirst() {
        return this.head;
    }

    /**
     * @returns - The last element of the list.
     */
    getLast() {
        let lastNode = this.head;
        if (lastNode) {
            while (lastNode.next) {
                lastNode = lastNode.next;
            }
        }
        return lastNode;
    }

    /**
     * Updates the head of the list to the provided node.
     * @param {ListNode} data - ListNode to add.
     */
    insertFirst(data) {
        data.next = this.head;
        this.head = data;
        return this.head;
    }

    /**
     * @returns boolean
     */
    isEmpty() {
        if (this.head) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * Iterator on  nodes in the list.
     */
    *[Symbol.iterator]() {
        let current = this.head;
        while (current) {
            yield current;
            current = current.next;
        }
    }
}

module.exports = {
    LinkedList,
    ListNode
};