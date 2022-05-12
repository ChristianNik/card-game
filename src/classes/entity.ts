import { categories, TCategory } from "../config/categories";
import EntityCategory from "./entity-category";

interface EntityArgs {
	title?: string;
	[key: string]: any;
}

class Entity {
	id: string;
	category: EntityCategory;
	args: EntityArgs;
	recipes: any;
	produces: any;
	constructor({
		id,
		category,
		args,
		recipes,
		produces
	}: {
		id: string;
		category: TCategory;
		args?: any;
		recipes?: any;
		produces?: any;
	}) {
		this.id = id;
		this.category = categories[category] || categories.fallback;
		this.args = args;

		this.recipes = recipes;
		this.produces = produces;
	}

	getRecepie(ingredients: any[]) {
		return;
	}
}

export default Entity;
