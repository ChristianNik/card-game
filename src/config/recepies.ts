import EntityIngredient from "../classes/entity-ingredient";
import EntityRecepie from "../classes/entity-recepie";

const persons = {
	baby: new EntityRecepie({
		id: "baby",
		duration: 30,
		ingredients: [
			new EntityIngredient("house", {
				count: 1,
				isConsumable: false
			}),
			new EntityIngredient("villager", {
				count: 2,
				isConsumable: false
			})
		]
	}),
	villager: new EntityRecepie({
		id: "villager",
		duration: 60,
		ingredients: [
			new EntityIngredient("house", {
				count: 1
			}),
			new EntityIngredient("baby", {
				count: 1
			})
		]
	})
};

const ingredients = {
	stone: new EntityRecepie({
		id: "stone",
		duration: 1,
		ingredients: [
			new EntityIngredient("rock"),
			new EntityIngredient("villager", {
				isConsumable: false
			})
		]
	}),
	brick: new EntityRecepie({
		id: "brick",
		duration: 1,
		ingredients: [
			new EntityIngredient("stone", {
				count: 3
			}),
			new EntityIngredient("villager", {
				isConsumable: false
			})
		]
	}),
	stick: new EntityRecepie({
		id: "stick",
		duration: 1,
		ingredients: [
			new EntityIngredient("wood"),
			new EntityIngredient("villager", {
				isConsumable: false
			})
		]
	}),
	wood: new EntityRecepie({
		id: "wood",
		duration: 3,
		ingredients: [
			new EntityIngredient("tree"),
			new EntityIngredient("villager", {
				isConsumable: false
			})
		]
	})
};

const consumables = {
	electricity: new EntityRecepie({
		id: "electricity",
		duration: 60,
		ingredients: [
			new EntityIngredient("powerStation", {
				count: 1,
				isConsumable: false
			})
		]
	}),
	water: new EntityRecepie({
		id: "water",
		duration: 60,
		ingredients: [
			new EntityIngredient("pump", {
				count: 1,
				isConsumable: false
			})
		]
	})
};

const buildings = {
	house: new EntityRecepie({
		id: "house",
		duration: 1,
		ingredients: [
			new EntityIngredient("tree", {
				count: 1
			}),
			new EntityIngredient("rock", {
				count: 1
			})
		]
	}),
	pump: new EntityRecepie({
		id: "pump",
		duration: 1,
		ingredients: [
			new EntityIngredient("wood", {
				count: 1
			}),
			new EntityIngredient("rock", {
				count: 1
			})
		]
	})
};

const recepies = {
	...persons,
	...ingredients,
	...buildings,
	...consumables,
	fallback: new EntityRecepie({
		id: "fallback",
		duration: 5,
		ingredients: [
			new EntityIngredient("stick", {
				count: 1
			}),
			new EntityIngredient("stone", {
				count: 3
			}),
			new EntityIngredient("villager", {
				isConsumable: false
			})
		]
	})
};

function getRecepieEntity(id: string): EntityIngredient | null {
	return recepies[id] || null;
}

type TRecepies = typeof recepies;

export { getRecepieEntity, recepies };
export type { TRecepies };
