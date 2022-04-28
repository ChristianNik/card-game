import { recepies } from "../config/recepies";
import { getCraftable } from "../logic/crafting";
import { generateId } from "../utils";
import { globalevents } from "../utils/global-events";
import Card from "./card";
import EntityRecepie from "./entity-recepie";

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

			if (this.__interval) {
				clearInterval(this.__interval);
				this.__interval = null;
			}
		},
		craft_success: () => {
			globalevents.emit.craftingDone(
				this.recepie.id,
				this.id,
				this.rootCard.x,
				this.rootCard.y
			);
			this._events.craft_done();
			this.tryCraft();
		}
	};
	id = generateId();
	cards: Card[] = [];
	canCraft: boolean = false;
	// TODO: getter / setter with max = 1
	progressBarValue: number = 0;

	recepie: EntityRecepie | null;

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
		if (!recepieId) return this._events.craft_done();

		const craftRecepie = recepies[recepieId];
		if (!craftRecepie) return;

		this._events.craft_start(craftRecepie);

		const increment = () => {
			const recepieId = getCraftable(this.getIngredients());

			if (!recepieId) {
				this._events.craft_done();
			} else if (this.progressBarValue >= 1) {
				if (!this.recepie) return this._events.craft_done();
				// emit success event
				this._events.craft_success();
			}
			this.progressBarValue += 0.01;
		};

		if (this.__interval) return;
		this.__interval = setInterval(increment, (craftRecepie.duration * 100) / 10);
	}

	getCardsToRemove() {
		const cardsIdsToRemove = this.cards
			.filter(card => {
				const ingred = this.recepie.ingredients.find(i => i.type === card.type);
				return ingred.willConsume;
			})
			.map(c => c.id);

		return cardsIdsToRemove;
	}

	private _drawProgressBar(ctx: CanvasRenderingContext2D) {
		const height = 24;
		const offset = 16;
		const x = this.rootCard.x;
		const y = this.rootCard.y - height - offset;

		const padding = 2;

		const progressBarHeight = height - padding * 2;
		const progressBarMaxWidth = this.rootCard.width - padding * 2;

		// ground
		ctx.fillStyle = "#000";
		ctx.fillRect(x, y, this.rootCard.width, height);

		// border
		ctx.lineWidth = 4;
		ctx.strokeRect(x, y, this.rootCard.width, height);
		// bar
		ctx.fillStyle = "#fff";
		ctx.fillRect(
			x + padding,
			y + padding,
			progressBarMaxWidth * this.progressBarValue,
			progressBarHeight
		);
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.save();

		if (this.canCraft && this.rootCard) {
			this._drawProgressBar(ctx);
		}

		this.cards.forEach((card, i) => {
			if (!card) throw new Error(`Card with id '${card.id}' not found.`);

			const isRoot = i === 0;

			if (!isRoot) {
				card.x = this.rootCard.x;
				card.y = this.rootCard.y + 40 * i;
			}

			ctx.save();
			card.update(ctx);
			ctx.restore();
		});
		ctx.restore();
	}
}

export default CardStack;
