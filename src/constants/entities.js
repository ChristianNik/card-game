import { cardCategory, categories } from "./categories";
import { recepies } from "./recepies";

class Entity {
	constructor({ id, category, args, recepie }) {
		this.id = id;
		this.category = category;
		this.args = args;
		this.recepie = recepie;
	}
}

const cardTypes = {};
cardTypes.villager = registerEntity({
	id: "villager",
	title: "Villager",
	category: cardCategory.person
});
cardTypes.stone = registerEntity({
	id: "stone",
	title: "Stone",
	category: cardCategory.ingredient
});
cardTypes.wood = registerEntity({
	id: "wood",
	title: "Wood",
	category: cardCategory.ingredient
});
cardTypes.stick = registerEntity({
	id: "stick",
	title: "Stick",
	category: cardCategory.ingredient
});
cardTypes.default = registerEntity({
	id: "default",
	title: "Default",
	category: cardCategory.default
});
cardTypes.tree = registerEntity({
	id: "tree",
	title: "Tree",
	category: cardCategory.recource
});
cardTypes.baby = registerEntity({
	id: "baby",
	title: "Baby",
	category: cardCategory.person
});

function registerEntity({ id, title, category = "default" }) {
	const entityCategory = categories[category] || categories.default;
	const _recepie = recepies[id] || undefined;

	const entity = new Entity({
		id: id,
		category: entityCategory.name,
		args: {
			title,
			...entityCategory.args
		},
		recepie: _recepie
	});

	return {
		...entity,
		factory: () => {
			return entity;
		}
	};
}

export { Entity, cardTypes };
