import { generateId } from "../utils";
import { LinkedList, ListNode } from "../utils/linked-list";
import Card from "./card";

class CardStack extends LinkedList<Card> {
	id = generateId();
	constructor() {
		super();
	}

	insertAtEnd(data: Card): ListNode<Card> {
		if (this.head) {
			data.x = this.head.data.x;
			data.y = this.head.data.y + data.headerHeight * this.length;
		}

		return super.insertAtEnd(data);
	}

	indexOf(id: string): number {
		let index = -1;
		this.forEach((node, i) => {
			if (index === -1 && node.data.id === id) {
				index = i;
			}
		});

		return index;
	}

	has(id): boolean {
		return this.indexOf(id) !== -1;
	}
}

export default CardStack;
