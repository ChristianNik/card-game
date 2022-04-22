import Card from "./card";
import CardStack from "./card-stack";

interface ManagerInits {
	initCards?: Card[];
	initCardStack?: CardStack[];
}
class CardStackManager {
	cards: Card[] = [];
	cardStack: CardStack[] = [];
	constructor({ initCards, initCardStack }: ManagerInits) {
		initCards && (this.cards = initCards);
		initCardStack && (this.cardStack = initCardStack);
	}

	getCardById(id: string): Card {
		return this.cards.find(c => c.id === id);
	}

	getCardIndexById(id: string): number {
		return this.cards.findIndex(c => c.id === id);
	}

	getStackById(stackId: string) {
		return this.cardStack.find(s => s.id === stackId);
	}

	isStackRoot(stackId: string) {
		return this.findMatchedStack(stackId).stack.cards[0].id === stackId;
	}

	findMatchedStack(cardId: string): { stack: CardStack; index: number } | null {
		let matchIndex = -1;
		const matchedStack = this.cardStack.find(stack => {
			return stack.cards.find((card, i) => {
				if (cardId === card.id) {
					matchIndex = i;
					return true;
				}
				return false;
			});
		});
		if (matchedStack) {
			return {
				stack: matchedStack,
				index: matchIndex
			};
		}
		return null;
	}

	/**
	 * Moves a card to a Stack when defined or creates a new stack
	 * @param cardId Id of the Card
	 * @param stackId Id of the taget Stack
	 * @returns
	 */
	moveToStack(cardId: string, stackId?: string) {
		// find card stack

		const match = this.findMatchedStack(cardId);

		// exit when no match
		if (!match) return;

		const cards = match.stack.cards.slice(match.index);

		if (stackId) {
			// move to stack if it exists
			const stack = this.getStackById(stackId);
			stack.pushMany(cards);
		} else {
			// move card and children to new stack
			const stack = new CardStack(cards);
			this.cardStack.push(stack);
		}

		// remove card and children from old stack
		match.stack.cards.splice(match.index);
	}
}

export default CardStackManager;
