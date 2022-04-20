class EntityRecepie {
	constructor({ id, duration, ingredients }) {
		this.id = id;
		this.duration = duration;
		this.ingredients = ingredients;
	}
}

class EntityIngredient {
	constructor(name, { count = 1, willConsume = true } = {}) {
		this.count = count;
		this.name = name;
		this.willConsume = willConsume;
	}
}

const recepies = {
	stick: new EntityRecepie({
		id: "stick",
		duration: 1,
		ingredients: [
			new EntityIngredient("wood"),
			new EntityIngredient("villager", {
				willConsume: false
			})
		]
	}),
	wood: new EntityRecepie({
		id: "wood",
		duration: 3,
		ingredients: [
			new EntityIngredient("tree"),
			new EntityIngredient("villager", {
				willConsume: false
			})
		]
	}),
	baby: new EntityRecepie({
		id: "baby",
		duration: 30,
		ingredients: [
			new EntityIngredient("villager", {
				count: 2
			})
		]
	}),
	villager: new EntityRecepie({
		id: "villager",
		duration: 60,
		ingredients: [
			new EntityIngredient("baby", {
				count: 1
			})
		]
	}),
	default: new EntityRecepie({
		id: "default",
		duration: 5,
		ingredients: [
			new EntityIngredient("stick", {
				count: 1
			}),
			new EntityIngredient("stone", {
				count: 3
			}),
			new EntityIngredient("villager", {
				willConsume: false
			})
		]
	})
};

function getRecepieEntity(id) {
	return recepies[id];
}

export { EntityRecepie, EntityIngredient, getRecepieEntity, recepies };
