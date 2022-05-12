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

	has(id: string): boolean {
		return this.indexOf(id) !== -1;
	}

	setPosition(x: number, y: number) {
		this.head.data.x = x;
		this.head.data.y = y;

		this.forEach((node, i) => {
			const x = this.head.data.x;
			const y = this.head.data.y + this.head.data.headerHeight * i;
			node.data.setPosition(x, y);
		});
	}
}

export default CardStack;
