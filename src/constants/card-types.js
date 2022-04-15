const cardCategory = {
	foot: "foot",
	person: "person",
	enemy: "enemy",
	ingredient: "ingredient",
	recource: "recource",
	default: "default"
};

const categorys = {
	ingredient: {
		name: cardCategory.ingredient,
		args: {
			color: "#fff",
			bg1: "#677284",
			bg2: "#9CA2AE"
		}
	},
	person: {
		name: cardCategory.person,
		args: {
			color: "#000",
			bg1: "#FEF9C3",
			bg2: "#FEF08A"
		}
	},
	recource: {
		name: cardCategory.recource,
		args: {
			color: "#fff",
			bg1: "#42413C",
			bg2: "#61605B"
		}
	},
	default: {
		name: cardCategory.default,
		args: {
			color: "#fff",
			bg1: "#43423D",
			bg2: "#61605B"
		}
	}
};

const recepies = {
	stick: {
		duration: 1,
		ingredients: ["wood", "villager"]
	},
	wood: {
		duration: 3,
		ingredients: ["tree", "villager"]
	},
	default: {
		duration: 5,
		ingredients: ["stick", "stone", "villager"]
	}
};

function registerEntity({ id, title, category = "default" }) {
	const entityCategory = categorys[category] || categorys.default;
	const _recepie = recepies[id] || undefined;

	const entity = {
		id: id,
		category: entityCategory.name,
		args: {
			title,
			...entityCategory.args
		},
		recepie: _recepie
	};

	return {
		...entity,
		factory: () => {
			return entity;
		}
	};
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

export { cardTypes };
