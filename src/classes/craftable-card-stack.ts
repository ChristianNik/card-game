import { recipes } from "../config/recipes";
import { addCardStack, drawGame } from "../main";
import { ListNode } from "../utils/linked-list";
import Card from "./card";
import CardStack from "./card-stack";
import Ingredient from "./ingredient";
import Recipe from "./recipe";

class CraftableCardStack extends CardStack {
	isCrafting: boolean = false;
	private progress: number = 0;
	private quantity: number = 0;
	private handlerId?: number = null;
	private _recipe?: Recipe = null;
	constructor() {
		super();
	}

	//
	// Overrides
	//

	insertAt(data: Card, index: number): ListNode<Card> {
		const added = super.insertAt(data, index);
		this._handleStackChange();
		return added;
	}

	insertAtEnd(data: Card): ListNode<Card> {
		const added = super.insertAtEnd(data);
		this._handleStackChange();
		return added;
	}

	deleteAt(index: number, length?: number): ListNode<Card> {
		const deleted = super.deleteAt(index, length);
		this._handleStackChange();
		return deleted;
	}

	deleteLastNode(): ListNode<Card> {
		const deleted = super.deleteLastNode();
		this._handleStackChange();
		return deleted;
	}

	//
	// Getter
	//

	get progressValue() {
		return this.progress / 100;
	}

	//
	// Methods
	//

	private _handleStackChange() {
		// console.log("handleStackChange", this.stackIngredients);

		// reset state
		this._resetCraftingState();

		// set recepie
		const countMatch = (value: Ingredient) => this.stackIngredients[value.id] === value.count;
		this._recipe = recipes.find(r => r.ingredients.every(countMatch)) || null;

		if (!this._recipe) return;

		this._startCrafting();
	}

	private _startCrafting() {
		if (this.isCrafting) return;
		if (!this._recipe) return;
		// console.log("Crafting start");

		this.isCrafting = true;
		this.handlerId = setInterval(
			() => this._handleCraft(this._recipe),
			(this._recipe.duration * 100) / 10
		);
	}

	private _handleCraft(recipe: Recipe) {
		if (this.progress < 100) {
			this.progress += 1;
		} else {
			this.quantity++;

			const finished = this.quantity >= recipe.quantity;
			this._onCraftEnd(finished);
		}

		drawGame();
	}

	private _onCraftEnd(finished: boolean) {
		// console.log("Craft end");

		addCardStack(this._recipe);

		clearInterval(this.handlerId);
		this.progress = 0;
		this.isCrafting = false;

		if (finished) {
			this._deleteUsedCards();

			this._recipe = null;
			this.quantity = 0;
		} else {
			this._startCrafting();
		}
	}

	private _resetCraftingState() {
		clearInterval(this.handlerId);
		this.progress = 0;
		this.isCrafting = false;
		this._recipe = null;
		this.quantity = 0;
	}

	private _deleteUsedCards() {
		this.ingredientIds.forEach((id, i) => {
			const ingred = this._recipe?.ingredients.find(ingred => ingred.id === id);
			if (!ingred?.isConsumed) return;
			this.deleteAt(i, 1);
		});
	}
	//
	// UI
	//

	private _drawProgressBar(ctx: CanvasRenderingContext2D) {
		const height = 24;
		const offset = 16;
		const x = this.head?.data.x;
		const y = this.head?.data.y - height - offset;

		const padding = 2;

		const progressBarHeight = height - padding * 2;
		const progressBarMaxWidth = this.head?.data.width - padding * 2;

		// ground
		ctx.fillStyle = "#000";
		ctx.fillRect(x, y, this.head?.data.width, height);

		// border
		ctx.lineWidth = 4;
		ctx.strokeRect(x, y, this.head?.data.width, height);
		// bar
		ctx.fillStyle = "#fff";
		ctx.fillRect(
			x + padding,
			y + padding,
			progressBarMaxWidth * this.progressValue,
			progressBarHeight
		);
	}

	private _drawDebugInfo(ctx: CanvasRenderingContext2D) {
		const debugText = [
			`id: ${this.id}`,
			`x: ${this.x}`,
			`y: ${this.y}`,
			`width: ${this.width}`,
			`height: ${this.height}`,
			`children: ${this.size}`
		];

		const longestText = debugText.reduce((acc, text) => {
			return text.length > acc.length ? text : acc;
		}, "");

		const padding = 2;
		const height = 0.7 * 16 * debugText.length + padding * 2;
		const width = this.id.length * longestText.length - 25;
		const x = this.head?.data?.x - padding;
		const y = this.head?.data?.y;

		// ground
		ctx.fillStyle = "#000";
		ctx.fillRect(x, y, -width, height);

		// border
		ctx.lineWidth = 4;
		ctx.strokeRect(x, y, -width, height);
		// id
		ctx.textAlign = "right";

		ctx.textBaseline = "top";
		ctx.font = `bold 0.7rem ui-sans-serif, system-ui, Arial`;
		ctx.fillStyle = "#fff";

		debugText.forEach((text, i) => {
			ctx.fillText(text, x + padding, y + padding + i * 12);
		});

		ctx.textAlign = "left";
	}

	draw(ctx: CanvasRenderingContext2D, options: { drawDebug?: boolean } = {}): void {
		this._recipe && this._drawProgressBar(ctx);
		super.draw(ctx);
		options.drawDebug && this._drawDebugInfo(ctx);
	}
}

export default CraftableCardStack;
