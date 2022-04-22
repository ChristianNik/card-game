import { recepies } from "../config/recepies";
import { getCraftable } from "../logic/crafting";
import { generateId } from "../utils";

class CardStack {
	private __interval;
	id = generateId();
	cards: string[] = [];
	canCraft: boolean = false;
	progressBarValue: number = 0;

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
		// todo: get ingredients from cards
		const recepieId = getCraftable({
			wood: 1,
			villager: 1
		});

		if (!recepieId) return;
		const craftRecepie = recepies[recepieId];
		if (!craftRecepie) return;

		this.canCraft = true;

		const increment = () => {
			if (this.progressBarValue >= 1) {
				clearInterval(this.__interval);

				this.craftStateDone();
			}

			this.progressBarValue += 0.01;
		};
		this.__interval = setInterval(increment, (craftRecepie.duration * 100) / 10);
	}
}

export default CardStack;
