import { generateId } from "../utils";
import Card from "./card";

class CardStack {
	id = generateId();
	cards: Card[] = [];
	// TODO: getter / setter with max = 1
	progressBarValue: number = 0;

	constructor(cards: Card[]) {
		this.cards = cards || [];
	}

	get rootCard(): Card | null {
		return this.cards[0] || null;
	}

	push(card: Card) {
		this.cards.push(card);
		return this;
	}

	pushMany(cards: Card[]) {
		cards.forEach(card => this.push(card));
		return this;
	}

	splice(index: number) {
		return this.cards.splice(index);
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

		if (this.rootCard) {
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
