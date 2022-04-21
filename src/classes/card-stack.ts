import { generateId } from "../utils";

class CardStack {
	id = generateId();
	cards: string[] = [];

	constructor(cards: string[]) {
		this.cards = cards || [];
	}

	getRootCardId(): string | null {
		return this.cards[0] || null;
	}

	push(cardId: string) {
		this.cards.push(cardId);
		return this;
	}

	pushMany(cardsIds: string[]) {
		cardsIds.forEach(id => this.push(id));
		return this;
	}
}

export default CardStack;
