import { categories, EntityCategory, TCategory } from "./categories";
import { EntityRecepie, recepies } from "./recepies";

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
		this.category = categories[category] || categories.default;
		this.args = args;
		this.recepie = recepies[id] || null;
	}
}

const entities = {
	villager: new Entity({
		id: "villager",
		category: "person",
		args: {
			title: "Villager"
		}
	}),
	stone: new Entity({
		id: "stone",
		category: "ingredient",
		args: {
			title: "Stone"
		}
	}),
	wood: new Entity({
		id: "wood",
		category: "ingredient",
		args: {
			title: "Wood"
		}
	}),
	stick: new Entity({
		id: "stick",
		category: "ingredient",
		args: {
			title: "Stick"
		}
	}),
	default: new Entity({
		id: "default",
		category: "default",
		args: {
			title: "Default"
		}
	}),
	tree: new Entity({
		id: "tree",
		category: "ingredient",
		args: {
			title: "Tree"
		}
	}),
	baby: new Entity({
		id: "baby",
		category: "person",
		args: {
			title: "Baby"
		}
	})
};

type TEnities = keyof typeof entities;

export { Entity, entities };
export type { TEnities };
