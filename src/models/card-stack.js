import { getRecepieEntity } from "../constants/recepies";
import { getCraftable } from "../logic/crafting";
import { generateId } from "../utils";
import { DragableGameObject } from "./dragable-game-object";

class CardStack extends DragableGameObject {
	constructor(x, y, { onCraftDone = itemId => {} } = {}) {
		super(10, 10);
		// CORE
		this.id = generateId();
		this.cards = [];
		this.x = x;
		this.y = y;

		// CRAFTING
		this._progressBarValue = 0;
		this._canCraft = false;
		this._currentRecepie = null;
		// CRAFTING EVENTS
		this.events = {};
		this.events.onCraftDone = onCraftDone;
	}

	//
	// CORE
	//

	push(card) {
		this.cards.push(card);
		this._canCraft = !!this.getCraftableRecepie();
		return this;
	}
	pop(card) {
		this.cards.pop();
		return this;
	}

	//
	// CRAFTING
	//

	get progressBarValue() {
		return this._progressBarValue;
	}
	set progressBarValue(value) {
		if (value + this._progressBarValue > 2) return;
		this._progressBarValue = value;
	}

	getStackIngredients() {
		const stackIngredients = this.cards.reduce((acc, card) => {
			if (!acc[card.type.id]) {
				acc[card.type.id] = 0;
			}

			acc[card.type.id]++;

			return acc;
		}, {});

		return stackIngredients;
	}

	getCraftableRecepie() {
		const stackIngredients = this.getStackIngredients();
		const craftable = getCraftable(stackIngredients);
		const craftRecepie = getRecepieEntity(craftable);
		return craftRecepie || null;
	}

	craftStateDone() {
		this.events.onCraftDone(this._currentRecepie?.id);

		this._canCraft = false;
		this._progressBarValue = 0;
		this._currentRecepie = null;
	}

	craft() {
		if (!this._canCraft) return;

		const craftRecepie = this.getCraftableRecepie();
		if (!craftRecepie) return;

		this._currentRecepie = craftRecepie;

		const increment = () => {
			if (this.progressBarValue >= 1) {
				clearInterval(this.__interval);
				this.craftStateDone();
			}
			this.progressBarValue += 0.01;
		};

		this.__interval = setInterval(increment, (craftRecepie.duration * 100) / 10);
	}

	//
	// UI
	//

	_renderProgressBar(ctx) {
		const offsetTop = 40;
		const height = 30;
		const borderWidth = 3;
		const borderRadius = 6;

		const progressBarOffset = 6;
		const progressBarMaxWidth = this.width - progressBarOffset;

		// ground
		ctx.fillStyle = "#43423D";
		ctx.roundRect(
			this.x - borderWidth,
			this.y - offsetTop,
			this.width + borderWidth * 2,
			height,
			borderRadius
		);
		ctx.fill();

		// bar
		ctx.fillStyle = "#fff";
		ctx.roundRect(
			this.x + borderRadius - borderWidth,
			this.y - offsetTop + borderRadius,
			progressBarMaxWidth * this.progressBarValue,
			height - borderRadius * 2,
			borderRadius / 2
		);
		ctx.fill();
	}

	/** @param {CanvasRenderingContext2D} ctx */
	render(ctx) {
		if (this._canCraft) {
			this._renderProgressBar(ctx);
		}

		this.cards.forEach((card, i) => {
			card.x = this.x;
			card.y = this.y + card.headerHeight * i;
			card.render(ctx);
		});
	}
}

export { CardStack };
