import { TEnities } from "../config/entities";
import { isColliding } from "../utils/collision";
import Card from "./card";
import CardStack from "./card-stack";
import CraftManager from "./craft-manager";

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

	private onCraftFinish(event) {
		console.log("event :", event);

		const stack = this.getStackById(event.stackId);
		if (!stack) return;

		// remove used Ingredients
		event.consumed?.forEach((type: TEnities) => {
			const ids = stack.getIdsByType(type);
			ids.forEach(id => this.deleteCard(id));
		});

		// add produced card
		const pos = this.getValidPosition(...event.position);
		event.recipe.produces?.forEach(produce => {
			this.addCard(Card.fromType(produce.id, ...pos.point));
		});
	}

	private createCraftManagerInstance() {
		return new CraftManager({
			onCraftFinish: event => this.onCraftFinish(event)
		});
	}

	addCard(card: Card, stackId?: string) {
		const pos = this.getValidPosition(card.x, card.y);
		if (pos) {
			card.x = pos.point[0];
			card.y = pos.point[1];
		}
		this.cards.push(card);
		if (stackId) {
			this.getStackById(stackId).push(card);
			return;
		}

		this.cardStack.push(
			new CardStack([card], {
				craftManager: this.createCraftManagerInstance()
			})
		);
	}

	addCards(cards: Card[]) {
		this.cards.push(...cards);
		this.cardStack.push(
			new CardStack(cards, {
				craftManager: this.createCraftManagerInstance()
			})
		);
	}

	deleteCard(cardId: string) {
		const { stack } = this.findMatchedStack(cardId);
		stack.cards = stack.cards.filter(card => card.id !== cardId);
		this.cards = this.cards.filter(card => card.id !== cardId);
	}

	getCardById(id: string): Card {
		return this.cards.find(c => c.id === id);
	}

	getCardIndexById(id: string): number {
		return this.cards.findIndex(c => c.id === id);
	}

	getValidPosition(x?: number, y?: number) {
		const margin = 16;

		const cardWidth = 182;
		// const cardHeight = this.cards[0].height + this.cards[0].headerHeight;

		const collision = (x: number, y: number) =>
			this.cards.every(card => {
				return !isColliding(
					x,
					y,
					card.width,
					card.height,
					card.x,
					card.y,
					card.width,
					card.height
				);
			});

		const positions = [
			{
				type: "same",
				point: [x, y]
			},
			{
				type: "top",
				point: [x, y - 227]
			},
			{
				type: "right",
				point: [x + cardWidth + margin, y]
			},
			{
				type: "bottom",
				point: [x + cardWidth + margin, y]
			},
			{
				type: "left",
				point: [x - cardWidth - margin, y]
			}
		];

		const pos = positions.find(position => {
			return collision(position.point[0], position.point[1]);
		});

		return pos;
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

	splitStack(stackId: string) {
		const stack = this.getStackById(stackId);
		stack.cards.splice(1).forEach(card =>
			this.cardStack.push(
				new CardStack([card], {
					craftManager: this.createCraftManagerInstance()
				})
			)
		);
	}

	clearStacks() {
		this.cardStack = this.cardStack.filter(stack => stack.cards.length > 0);
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

		const cards = match.stack.splice(match.index);

		if (stackId) {
			// move to stack if it exists
			const stack = this.getStackById(stackId);
			stack.pushMany(cards);
		} else {
			// move card and children to new stack

			const stack = new CardStack(cards, {
				craftManager: this.createCraftManagerInstance()
			});
			this.cardStack.push(stack);
		}
	}
}

export default CardStackManager;
