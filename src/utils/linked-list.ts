class ListNode<T> {
	data: T;
	next?: ListNode<T>;
	constructor(data: T, next = null) {
		this.data = data;
		this.next = next;
	}
}

class LinkedList<T> {
	head?: ListNode<T>;
	constructor() {
		this.head = null;
	}

	insertAtBeginning(data: T) {
		let newNode = new ListNode(data);
		newNode.next = this.head;
		this.head = newNode;
		return this.head;
	}

	insertAtEnd(data: T) {
		// A newNode object is created with property data and next=null

		let newNode = new ListNode(data); // When head = null i.e. the list is empty, then head itself will point to the newNode.
		if (!this.head) {
			this.head = newNode;
			return this.head;
		}
		// Else, traverse the list to find the tail (the tail node will initially be pointing at null), and update the tail's next pointer.
		let tail = this.head;
		while (tail.next !== null) {
			tail = tail.next;
		}
		tail.next = newNode;
		return this.head;
	}

	getAt(index: number) {
		let counter = 0;
		let node = this.head;
		while (node) {
			if (counter === index) {
				return node;
			}
			counter++;
			node = node.next;
		}
		return null;
	}

	insertAt(data: T, index: number) {
		// if the list is empty i.e. head = null
		if (!this.head) {
			this.head = new ListNode(data);
			return;
		}
		// if new node needs to be inserted at the front of the list i.e. before the head.
		if (index === 0) {
			this.head = new ListNode(data, this.head);
			return;
		}
		// else, use getAt() to find the previous node.
		const previous = this.getAt(index - 1);
		let newNode = new ListNode(data);
		newNode.next = previous.next;
		previous.next = newNode;

		return this.head;
	}

	deleteFirstNode() {
		if (!this.head) {
			return;
		}
		this.head = this.head.next;
		return this.head;
	}

	deleteLastNode() {
		if (!this.head) {
			return null;
		} // if only one node in the list
		if (!this.head.next) {
			this.head = null;
			return;
		}
		let previous = this.head;
		let tail = this.head.next;

		while (tail.next !== null) {
			previous = tail;
			tail = tail.next;
		}

		previous.next = null;
		return this.head;
	}

	// deleteAt(index: number) {
	// 	// when list is empty i.e. head = null
	// 	if (!this.head) {
	// 		this.head = new ListNode(data);
	// 		return;
	// 	}
	// 	// node needs to be deleted from the front of the list i.e. before the head.
	// 	if (index === 0) {
	// 		this.head = this.head.next;
	// 		return;
	// 	}
	// 	// else, use getAt() to find the previous node.
	// 	const previous = this.getAt(index - 1);

	// 	if (!previous || !previous.next) {
	// 		return;
	// 	}

	// 	previous.next = previous.next.next;
	// 	return this.head;
	// }

	deleteList() {
		this.head = null;
	}

	get length(): number {
		let count = 0;
		let node = this.head;
		while (node) {
			count++;
			node = node.next;
		}

		return count;
	}
}

export { ListNode, LinkedList };
