//
//
// Categories
//
const cardCategory = {
	foot: "foot",
	person: "person",
	enemy: "enemy",
	ingredient: "ingredient",
	recource: "recource",
	test: "test",
	default: "default"
};
//
//
// Category Colors
//
class EntityCategory {
	constructor({ category, textColor, primaryColor, accentColor }) {
		this.name = category;
		this.args = {
			color: textColor,
			bg1: accentColor,
			bg2: primaryColor
		};
	}
}

const categorys = {
	ingredient: new EntityCategory({
		category: cardCategory.ingredient,
		textColor: "#fff",
		primaryColor: "#9CA2AE",
		accentColor: "#677284"
	}),
	person: new EntityCategory({
		category: cardCategory.person,
		textColor: "#000",
		primaryColor: "#FEF08A",
		accentColor: "#FEF9C3"
	}),
	recource: new EntityCategory({
		category: cardCategory.recource,
		textColor: "#fff",
		primaryColor: "#61605B",
		accentColor: "#42413C"
	}),
	default: new EntityCategory({
		category: cardCategory.default,
		textColor: "#fff",
		primaryColor: "#61605B",
		accentColor: "#43423D"
	})
};

//
//
// Recepies
//

class EntityRecepie {
	constructor({ duration, ingredients }) {
		this.duration = duration;
		this.ingredients = ingredients;
	}
}

class EntityIngredient {
	constructor(name, { count = 1 } = {}) {
		this.count = count;
		this.name = name;
	}
}

const recepies = {
	stick: new EntityRecepie({
		duration: 1,
		ingredients: [new EntityIngredient("wood"), new EntityIngredient("villager")]
	}),
	wood: new EntityRecepie({
		duration: 3,
		ingredients: [new EntityIngredient("tree"), new EntityIngredient("villager")]
	}),
	baby: new EntityRecepie({
		duration: 30,
		ingredients: [
			new EntityIngredient("villager", {
				count: 2
			})
		]
	}),
	villager: new EntityRecepie({
		duration: 60,
		ingredients: [
			new EntityIngredient("baby", {
				count: 1
			})
		]
	}),
	default: new EntityRecepie({
		duration: 5,
		ingredients: [
			new EntityIngredient("stick", {
				count: 1
			}),
			new EntityIngredient("stone", {
				count: 3
			}),
			new EntityIngredient("villager")
		]
	})
};
//
//
// Entries
//
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
//
//
//
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

export { cardTypes };