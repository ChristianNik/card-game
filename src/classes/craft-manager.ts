import { recipes } from "../config/recipes";
import CardStack from "./card-stack";
import Recipe from "./recipe";

class CraftManager {
	isCrafting: boolean;
	private progress: number;
	private quantity: number;
	private handlerId?: number;
	private stack: CardStack;
	private ingredients: { [key: string]: number } = {};
	private recipe: Recipe;
	private events: any = {};
	constructor(params: { stack?: CardStack; onCraftFinish?: (event: any) => void } = {}) {
		this.progress = 0;
		this.quantity = 0;
		this.isCrafting = false;

		if (params.stack) {
			this.stack = params.stack;
			this.tryCraft();
		}

		this.events.onCraftFinish = params.onCraftFinish;
	}

	get progressValue() {
		return this.progress / 100;
	}

	tryCraft() {
		this.ingredients = this.stack.getIngredients();
		this.recipe = this.findRecipe();
		if (this.recipe) {
			this.startCrafting();
		} else {
			this.stopCrafting();
		}
	}

	setStackRef(stack: CardStack) {
		this.stack = stack;
		this.tryCraft();
	}

	private startCrafting() {
		if (this.isCrafting) return;
		this.isCrafting = true;
		this.handlerId = setInterval(() => this.craftHandler(), (this.recipe.duration * 100) / 10);
	}

	private stopCrafting() {
		this.isCrafting = false;
		if (this.handlerId) {
			clearInterval(this.handlerId);
		}
		this.resetCrafting();
	}

	private resetCrafting() {
		this.progress = 0;
	}

	private finishCrafting() {
		const ingredTypes = this.getConsumedIngredient();

		const rootCard = this.stack?.rootCard;

		this.events.onCraftFinish?.({
			stackId: this.stack.id,
			consumed: ingredTypes,
			recipe: this.recipe,
			position: [rootCard.x, rootCard.y]
		});
	}

	private getConsumedIngredient() {
		const consumed = Object.keys(this.ingredients).filter(type => {
			const ingredient = this.recipe.ingredients.find(i => i.id === type);
			return ingredient?.isConsumed || false;
		});

		return consumed;
	}

	private findRecipe() {
		const ingredLength = Object.keys(this.ingredients).length;

		const recipe = recipes?.find(r => {
			if (ingredLength !== r.ingredients.length) return null;

			return r.ingredients.every(i => this.ingredients[i.id] - i.count == 0);
		});

		return recipe;
	}

	private craftHandler() {
		if (this.progress >= 100) {
			this.quantity++;

			const canProduce = this.quantity < this.recipe.quantity;
			if (canProduce) {
				this.resetCrafting();
				console.log("craft");

				return;
			}
			console.log("done");
			this.finishCrafting();
			this.stopCrafting();
			return;
		}

		this.progress += 1;
	}
}

export default CraftManager;
