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
	constructor({ id, category, args }: { id: string; category: TCategory; args?: any }) {
		this.id = id;
		this.category = categories[category] || categories.fallback;
		this.args = args;
	}
}

export default Entity;
