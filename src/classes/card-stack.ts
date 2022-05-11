import { LinkedList, ListNode } from "../utils/linked-list";
import Card from "./card";

class CardStack extends LinkedList<Card> {
	constructor() {
		super();
	}

	insertAtEnd(data: Card): ListNode<Card> {
		data.x = this.head.data.x;
		data.y = this.head.data.y + data.headerHeight * this.length;

		return super.insertAtEnd(data);
	}
}

export default CardStack;
