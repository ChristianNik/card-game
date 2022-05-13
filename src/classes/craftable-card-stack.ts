import { recipes } from "../config/recipes";
import { drawGame } from "../main";
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

	deleteAt(index: number): ListNode<Card> {
		const deleted = super.deleteAt(index);
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
		console.log("handleStackChange", this.stackIngredients);

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
		console.log("Crafting start");

		this.isCrafting = true;
		this.handlerId = setInterval(
			() => this._handleCraft(this._recipe),
			(this._recipe.duration * 100) / 10
		);
	}

	private _handleCraft(recipe: Recipe) {
		console.log("Crafting...", this.progress);
		if (this.progress >= 100) {
			this.quantity++;

			const finished = this.quantity < recipe.quantity;
			console.log("finished :", finished);

			if (finished) {
				this._onCraftEnd();
			} else {
				this._onCraftDone();
				this._startCrafting();
			}

			drawGame();
			return;
		}

		this.progress += 1;
		drawGame();
	}

	private _onCraftDone() {
		console.log("Craft done");

		clearInterval(this.handlerId);
		this.progress = 0;
		this.isCrafting = false;
	}

	private _onCraftEnd() {
		console.log("Craft end");

		clearInterval(this.handlerId);
		this.progress = 0;
		this.isCrafting = false;
		this._recipe = null;
		this.quantity = 0;
	}

	private _resetCraftingState() {
		clearInterval(this.handlerId);
		this.progress = 0;
		this.isCrafting = false;
		this._recipe = null;
		this.quantity = 0;
	}

	//
	// UI
	//

	private _drawProgressBar(ctx: CanvasRenderingContext2D) {
		const height = 24;
		const offset = 16;
		const x = this.head.data.x;
		const y = this.head.data.y - height - offset;

		const padding = 2;

		const progressBarHeight = height - padding * 2;
		const progressBarMaxWidth = this.head.data.width - padding * 2;

		// ground
		ctx.fillStyle = "#000";
		ctx.fillRect(x, y, this.head.data.width, height);

		// border
		ctx.lineWidth = 4;
		ctx.strokeRect(x, y, this.head.data.width, height);
		// bar
		ctx.fillStyle = "#fff";
		ctx.fillRect(
			x + padding,
			y + padding,
			progressBarMaxWidth * this.progressValue,
			progressBarHeight
		);
	}

	draw(ctx: CanvasRenderingContext2D): void {
		this._recipe && this._drawProgressBar(ctx);
		super.draw(ctx);
	}
}

export default CraftableCardStack;
