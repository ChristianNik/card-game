import { categories, TCategory } from "../config/categories";
import { recepies } from "../config/recepies";
import EntityCategory from "./entity-category";
import EntityRecepie from "./entity-recepie";

interface EntityArgs {
	title?: string;
	[key: string]: any;
}

class Entity {
	id: string;
	category: EntityCategory;
	args: EntityArgs;
	recepie: EntityRecepie | null;
	constructor({ id, category, args }: { id: string; category: TCategory; args?: any }) {
		this.id = id;
		this.category = categories[category] || categories.fallback;
		this.args = args;
		this.recepie = recepies[id] || null;
	}
}

export default Entity;
