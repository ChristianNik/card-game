import CardStack from "./card-stack";

class CardStackManager {
	cardStack: CardStack[] = [];
	constructor(cardStack?: CardStack[]) {
		cardStack && (this.cardStack = cardStack);
	}

	getStackById(stackId: string) {
		return this.cardStack.find(s => s.id === stackId);
	}

	findMatchedStack(cardId: string): { stack: CardStack; index: number } | null {
		let matchIndex = -1;
		const matchedStack = this.cardStack.find(stack => {
			return stack.cards.find((id, i) => {
				if (cardId === id) {
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

			const rootCard = stack.getRootCard();
			const matchedStackRootCard = match.stack.getRootCard();
			rootCard.y = matchedStackRootCard.y;
			rootCard.x = matchedStackRootCard.x + 300;
			this.cardStack.push(stack);
		}

		// remove card and children from old stack
		match.stack.cards.splice(match.index);
	}
}

export default CardStackManager;
