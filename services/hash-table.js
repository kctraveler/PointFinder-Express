/**
 * Creates a HashTable using a simple hash function.
 * Custom implementation of a LinkedList used for collisions.
 * @author Shane Panchot
 */
const ListNode = require('./linked-list').ListNode;
const LinkedList = require('./linked-list').LinkedList;

class HashTable {
    /**
     * Constructor for HashTable.
     * @param {integer} arraySize - Size of the underlying array.
     */
    constructor(arraySize = 1024) {
        this.table = new Array(arraySize);
        this.size = 0;
    }

    /**
     * Simple Hash function based on sum of ASCII characters in key.
     * @private
     * @param {String} key - String used as key in HashTable 
     */
    _hash(key) {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % this.table.length;

        /** Come back to this, need better hash function */
        // let len = key.length;
        // let h = 5381;

        // for (let i = 0; i < len; i++) {
        //     h = h * 33 ^ key.charCodeAt(i)
        // }
        // return (h >>> 0) % this.table.length;
    }

    /**
     * Adds key value pair to the hash table.
     * @param {String} key
     * @param {*} value 
     */
    set(key, value) {
        const index = this._hash(key);
        const newNode = new ListNode([key, value]);
        if (this.table[index]) {
            for (const node of this.table[index]) {
                if (node.data[0] === newNode.data[0]) {
                    node.data[1] = newNode.data[1];
                    return;
                }
            }
            this.table[index].insertFirst(newNode);
        } else {
            this.table[index] = new LinkedList(newNode);
        }
        this.size++;
    }

    /**
     * Look up value for the given key.
     * @param {String} key 
     * @returns value for the given key.
     */
    get(key) {
        const index = this._hash(key);
        if (!this.table[index]) {
            return undefined
        };
        for (const node of this.table[index]) {
            if (node.data[0] === key) {
                return node.data[1];
            }
        }
    }

    /**
     * Removes entry for provided key.
     * @param {String} key 
     * @returns boolean true if success, false if key not found.
     */
    remove(key) {
        const index = this._hash(key);
        if (!this.table[index] || this.table[index].isEmpty()) {
            return false
        };
        let list = this.table[index];
        let lastNode = null;
        for (const node of list) {
            if (node.data[0] === key) {
                if (!lastNode) {
                    list.head = node.next;
                } else {
                    lastNode.next = node.next;
                }
                console.log(JSON.stringify(this.table[index]));
                return true;
            }
            lastNode = node;

        }
    }

    analyze() {
        let numEmpty = 0;
        let highestCollision = 0;
        let numberCollisions = 0;
        for (let i = 0; i < this.table.length; i++) {
            if (!this.table[i]) {
                numEmpty++;
            } else if (this.table[i].isEmpty()) {
                numEmpty++;
            } else {
                const collisionSize = this.table[i].size();
                if (collisionSize > 1) numberCollisions++;
                if (collisionSize > highestCollision) {
                    highestCollision = collisionSize;
                }
            }
        }
        let results = {
            Size: this.table.length,
            Empty: numEmpty,
            Highest_Collision: highestCollision,
            Number_Collisions: numberCollisions,
            Number_Occupied: this.table.length - numEmpty
        };

        return results;
    }
}

module.exports = HashTable;