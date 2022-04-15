const cardCategory = {
	foot: "foot",
	person: "person",
	enemy: "enemy",
	ingredient: "ingredient",
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
	default: {
		name: cardCategory.default,
		args: {
			color: "#fff",
			bg1: "#43423D",
			bg2: "#61605B"
		}
	}
};

const registerEntity = ({ id, title, category = "default" }) => {
	const entityCategory = categorys[category] || categorys.default;

	return {
		id: id,
		category: entityCategory.name,
		args: {
			title,
			...entityCategory.args
		}
	};
};

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
	category: cardCategory.ingredient,
	recepie: [cardTypes.wood.id]
});
cardTypes.default = registerEntity({
		id: "default",
		title: "Default",
		category: cardCategory.default
});

export { cardTypes };
