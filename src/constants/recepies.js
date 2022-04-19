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

export { EntityRecepie, EntityIngredient, recepies };
