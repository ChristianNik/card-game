import { categories, TCategory } from "../config/categories";
import { recipes } from "../config/recipes";
import EntityCategory from "./entity-category";
import Ingredient from "./ingredient";
import Recipe from "./recipe";

interface EntityArgs {
	title?: string;
	[key: string]: any;
}

class Entity {
	id: string;
	category: EntityCategory;
	args: EntityArgs;
	recipes: Recipe[];
	produces: any;
	constructor({
		id,
		category,
		args,
		produces
	}: {
		id: string;
		category: TCategory;
		args?: any;
		produces?: any;
	}) {
		this.id = id;
		this.category = categories[category] || categories.fallback;
		this.args = args;

		this.recipes = recipes.filter(r => r.produces.id === id);
		this.produces = produces;
	}

	getCraftableRecepie(ingredients: Ingredient[]) {
		return this.recipes.find(r => {
			return r.ingredients.every(ingred => {
				const match = ingredients.find(ing => ing.id === ingred.id);
				return match?.count === ingred.count;
			});
		});
	}
}

export default Entity;
