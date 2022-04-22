import { generateId } from "../utils";

class CardStack {
	id = generateId();
	cards: string[] = [];
	canCraft: boolean = false;
	progressBarValue: number = 0;
	__interval;

	constructor(cards: string[]) {
		this.cards = cards || [];
		console.log("constructor: craft?");
		this.tryCraft();
	}

	getRootCardId(): string | null {
		return this.cards[0] || null;
	}

	push(cardId: string) {
		this.cards.push(cardId);
		this.tryCraft();
		return this;
	}

	pushMany(cardsIds: string[]) {
		cardsIds.forEach(id => this.push(id));
		return this;
	}

	craftStateDone() {
		// this.events.onCraftDone(this._currentRecepie?.id);

		console.log(this.id, "craftStateDone");

		this.canCraft = false;
		this.progressBarValue = 0;
		// this._currentRecepie = null;
	}

	tryCraft() {
		this.canCraft = this.canCraft ? false : this.cards.length > 1;
		if (!this.canCraft) return;

		// const craftRecepie = this.getCraftableRecepie();
		// if (!craftRecepie) return;

		// this._currentRecepie = craftRecepie;

		const increment = () => {
			if (this.progressBarValue >= 1) {
				clearInterval(this.__interval);

				this.craftStateDone();
			}

			this.progressBarValue += 0.01;
		};
		this.__interval = setInterval(increment, (Math.random() + 500) / 10);
		// this.__interval = setInterval(increment, (craftRecepie.duration * 100) / 10);
	}
}

export default CardStack;
