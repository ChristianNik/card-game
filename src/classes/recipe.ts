import CraftResult from "./craft-result";
import Ingredient from "./ingredient";

class Recipe {
	produces: CraftResult[];
	duration: number;
	quantity: number;
	ingredients: Ingredient[];
	constructor(args: {
		ingredients: Ingredient[];
		duration: number;
		produces: CraftResult[];
		quantity: number;
	}) {
		this.produces = args.produces;
		this.duration = args.duration;
		this.quantity = args.quantity;
		this.ingredients = args.ingredients;
	}
}

export default Recipe;
