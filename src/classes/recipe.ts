import { TEnities } from "../config/entities";
import CraftResult from "./craft-result";
import Ingredient from "./ingredient";

class Recipe {
	_ingredients: Array<Ingredient | TEnities>;
	duration: number;
	_produces: Array<CraftResult | TEnities>;
	quantity: number;
	constructor(args: {
		ingredients: Array<Ingredient | TEnities>;
		duration: number;
		produces: Array<CraftResult | TEnities>;
		quantity: number;
	}) {
		this._produces = args.produces;
		this.duration = args.duration;
		this.quantity = args.quantity;
		this._ingredients = args.ingredients;
	}

	get ingredients(): Ingredient[] {
		return this._ingredients.map((ingred: any) => {
			if (ingred instanceof Ingredient) return ingred;
			if (typeof ingred === "object")
				return new Ingredient(ingred.id, ingred.count, ingred.isConsumed);

			return new Ingredient(ingred, 1, true);
		});
	}

	get produces(): CraftResult[] {
		return this._produces.map(prod => {
			if (prod instanceof CraftResult) return prod;

			return new CraftResult(prod, 1);
		});
	}
}

export default Recipe;
