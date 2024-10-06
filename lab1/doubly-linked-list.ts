class ListNode<T> {
    data: T;
    next: ListNode<T> | null;
    prev: ListNode<T> | null;

    constructor(data: T) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList<T> {
    head: ListNode<T> | null;
    tail: ListNode<T> | null;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    // Static method to convert list to string
    static toString<T>(list: DoublyLinkedList<T>): string {
        let current = list.head;
        let result = "";
        while (current !== null) {
            result += `${current.data}`;
            if (current.next !== null) {
                result += " <-> ";
            }
            current = current.next;
        }
        return result;
    }

    // Method to check if an element exists in the list
    contains(data: T): boolean {
        let current = this.head;
        while (current !== null) {
            if (current.data === data) {
                return true; // Element found
            }
            current = current.next;
        }
        return false; // Element not found
    }

    // Insert at the beginning
    insertAtBeginning(data: T): void {
        if (this.contains(data)) {
            throw new Error(`Element ${data} already exists in the list. Cannot add duplicate.`);
            return;
        }
        const newNode = new ListNode(data);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
    }

    // Insert at the end
    insertAtEnd(data: T): void {
        if (this.contains(data)) {
            throw new Error(`Element ${data} already exists in the list. Cannot add duplicate.`);
        }
        const newNode = new ListNode(data);
        if (this.tail === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
    }

    // Delete a node
    deleteNode(node: ListNode<T>): void {
        if (this.head === null || node === null) return;

        if (this.head === node) {
            this.head = node.next;
        }

        if (this.tail === node) {
            this.tail = node.prev;
        }

        if (node.next !== null) {
            node.next.prev = node.prev;
        }

        if (node.prev !== null) {
            node.prev.next = node.next;
        }
    }

    // Traverse forward
    traverseForward(): void {
        let current = this.head;
        while (current) {
            console.log(current.data);
            current = current.next;
        }
    }

    // Traverse backward
    traverseBackward(): void {
        let current = this.tail;
        while (current) {
            console.log(current.data);
            current = current.prev;
        }
    }
}

// Reading input from user
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    try {
        const inputN: string = await new Promise(resolve => {
            readline.question('Enter the number of elements (N): ', resolve)
        })

        const N = parseInt(inputN);

        if (N <= 1 || N >= 256) {
            throw new Error('N must be between 1 and 256.');
        }

        const inputElements: string = await new Promise(resolve => {
            readline.question('Enter the elements: ', resolve)
        })

        readline.close();

        const values = inputElements.split(' ').map(Number);
        const size = values.length;

        const list = new DoublyLinkedList<number>();

        // Inserting elements into the list
        for (let i = 0; i < N; i++) {
            list.insertAtEnd(values[i]);
        }

        if (N != size) {
            throw new Error('N must be equal to the number of elements.');
        }

        console.log('The list is:', DoublyLinkedList.toString(list));
        console.log('Sum of elements:', sum(list));
        console.log('Average of elements:', average(list));
        console.log('Three minimum elements:', findThreeMinElements(list));
        console.log('Three maximum elements:', findThreeMaxElements(list));
        console.log('Element [N/2] :', findElementNDivideTwoIndex(list));
    } catch (error: any) {
        console.log(error.message);
    }
}

// O(n)
function sum(list: DoublyLinkedList<number>): number {
    let sum = 0;
    let current = list.head;
    while (current) {
        sum += current.data;
        current = current.next;
    }
    return sum;
}

// O(n)
function average(list: DoublyLinkedList<number>): number {
    let sum = 0;
    let N = 0;
    let current = list.head;
    while (current) {
        sum += current.data;
        N++;
        current = current.next;
    }
    return sum / N;
}

// O(n)
function findThreeMinElements(list: DoublyLinkedList<number>): number[] {
    let size = 0;
    let current = list.head;
    while (current) {
        size++;
        current = current.next;
    }

    if (size < 3) {
        throw new Error("The list has fewer than three elements.");
    }

    let min1 = Infinity, min2 = Infinity, min3 = Infinity;
    current = list.head;

    while (current) {
        const value = current.data;
        if (value < min1) {
            min3 = min2;
            min2 = min1;
            min1 = value;
        } else if (value < min2) {
            min3 = min2;
            min2 = value;
        } else if (value < min3) {
            min3 = value;
        }
        current = current.next;
    }

    return [min1, min2, min3];
}

// O(n)
function findThreeMaxElements(list: DoublyLinkedList<number>): number[] {
    let size = 0;
    let current = list.head;
    while (current) {
        size++;
        current = current.next;
    }

    if (size < 3) {
        throw new Error("The list has fewer than three elements.");
    }

    let max1 = -Infinity, max2 = -Infinity, max3 = -Infinity;
    current = list.head;

    while (current) {
        const value = current.data;
        if (value > max1) {
            max3 = max2;
            max2 = max1;
            max1 = value;
        } else if (value > max2) {
            max3 = max2;
            max2 = value;
        } else if (value > max3) {
            max3 = value;
        }
        current = current.next;
    }

    return [max1, max2, max3];
}

// O(n)
function findElementNDivideTwoIndex(list: DoublyLinkedList<number>): number {
    let current = list.head;
    let size = 0;
    while (current) {
        size++;
        current = current.next; 
    }

    const n = Math.floor(size / 2) - 1;

    current = list.head;
    for (let i = 0; i < n; i++) {
        current = current.next;
    }
    return current.data;
}

main();
