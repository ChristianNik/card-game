import { categories, EntityCategoryArgs, TCategory } from "./categories";
import { EntityRecepie, recepies } from "./recepies";

class Entity {
	id: string;
	category: TCategory;
	args: EntityCategoryArgs;
	recepie: EntityRecepie | null;
	constructor(id: string, { args }: { args?: any }) {
		this.id = id;
		this.category = categories[id] || categories.default;
		this.args = args;
		this.recepie = recepies[id] || null;
	}
}

const entities = {
	villager: new Entity("villager", {
		args: {
			title: "Villager"
		}
	}),
	stone: new Entity("stone", {
		args: {
			title: "Stone"
		}
	}),
	wood: new Entity("wood", {
		args: {
			title: "Wood"
		}
	}),
	stick: new Entity("stick", {
		args: {
			title: "Stick"
		}
	}),
	default: new Entity("default", {
		args: {
			title: "Default"
		}
	}),
	tree: new Entity("tree", {
		args: {
			title: "Tree"
		}
	}),
	baby: new Entity("baby", {
		args: {
			title: "Baby"
		}
	})
};

type TEnities = keyof typeof entities;

export { Entity, entities };
export type { TEnities };
