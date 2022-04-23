import { TEnities } from "../config/entities";
import { EntityRecepie, recepies } from "../config/recepies";
import { getCraftable } from "../logic/crafting";
import { generateId } from "../utils";
import Card from "./card";

class CardStack {
	private __interval;
	private _events = {
		craft_start: recepie => {
			this.recepie = recepie;
			this.canCraft = true;
		},
		craft_done: () => {
			this.canCraft = false;
			this.progressBarValue = 0;
			this.recepie = null;
		},
		craft_success: () => {
			console.log(this.id, "craft_success", this.recepie.id);

			this.events?.craft_success?.(this.recepie.id);
			this._events.craft_done();
		}
	};
	id = generateId();
	cards: Card[] = [];
	canCraft: boolean = false;
	progressBarValue: number = 0;

	recepie: EntityRecepie | null;

	events: {
		craft_success?: (id: TEnities) => void;
	} = {};

	constructor(cards: Card[]) {
		this.cards = cards || [];
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

	getIngredients() {
		return this.cards.reduce((acc, card) => {
			if (!acc[card.type]) {
				acc[card.type] = 0;
			}
			acc[card.type]++;
			return acc;
		}, {});
	}

	tryCraft() {
		const recepieId = getCraftable(this.getIngredients());
		if (!recepieId) return;

		const craftRecepie = recepies[recepieId];
		if (!craftRecepie) return;

		this._events.craft_start(craftRecepie);

		const increment = () => {
			const recepieId = getCraftable(this.getIngredients());

			if (!recepieId) {
				this._events.craft_done();
			} else if (this.progressBarValue >= 1) {
				clearInterval(this.__interval);

				if (!this.recepie) return;
				// emit success event
				this._events.craft_success();
			}
			this.progressBarValue += 0.01;
		};
		this.__interval = setInterval(increment, (craftRecepie.duration * 100) / 10);
	}
}

export default CardStack;
