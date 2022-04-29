import { TEnities } from "../config/entities";
import { generateId } from "../utils";
import Card from "./card";
import CraftManager from "./craft-manager";

class CardStack {
	id = generateId();
	cards: Card[] = [];
	craftManager: CraftManager;

	constructor(cards: Card[], optional: { craftManager?: CraftManager } = {}) {
		this.cards = cards || [];
		this.craftManager = optional.craftManager;

		if (this.craftManager) {
			this.craftManager.setStackRef(this);
		}
	}

	get rootCard(): Card | null {
		return this.cards[0] || null;
	}

	push(card: Card) {
		this.cards.push(card);

		this.craftManager?.tryCraft();
		return this;
	}

	pushMany(cards: Card[]) {
		cards.forEach(card => this.push(card));
		return this;
	}

	splice(index: number) {
		const cards = this.cards.splice(index);
		this.craftManager?.tryCraft();
		return cards;
	}

	getIngredients(): { [key: string]: number } {
		return this.cards.reduce((acc, card) => {
			if (!acc[card.type]) {
				acc[card.type] = 0;
			}
			acc[card.type]++;
			return acc;
		}, {});
	}

	removeIngredient(type: TEnities) {
		this.cards = this.cards.filter(c => c.type !== type);

		return this;
	}

	getIdsByType(type: TEnities) {
		const ids = this.cards.filter(c => c.type === type).map(c => c.id);
		return ids;
	}

	private _drawProgressBar(ctx: CanvasRenderingContext2D, progressBarValue: number) {
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
			progressBarMaxWidth * progressBarValue,
			progressBarHeight
		);
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.save();

		if (this.rootCard && this.craftManager?.isCrafting) {
			this._drawProgressBar(ctx, this.craftManager?.progressValue);
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
