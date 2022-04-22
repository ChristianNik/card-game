import { recepies } from "../config/recepies";
import { getCraftable } from "../logic/crafting";
import { generateId } from "../utils";
import Card from "./card";

class CardStack {
	private __interval;
	id = generateId();
	cards: Card[] = [];
	canCraft: boolean = false;
	progressBarValue: number = 0;

	constructor(cards: Card[]) {
		this.cards = cards || [];
		console.log("constructor: craft?");
		this.tryCraft();
	}

	get rootCard(): Card | null {
		return this.cards[0] || null;
	}

	push(card: Card) {
		this.cards.push(card);
		this.tryCraft();
		return this;
	}

	pushMany(cards: Card[]) {
		cards.forEach(card => this.push(card));
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
