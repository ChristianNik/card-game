import { TEnities } from "./entities";
class EntityRecepie {
	id: TEnities;
	duration: number;
	ingredients: EntityIngredient[];
	constructor({
		id,
		duration,
		ingredients
	}: {
		id: TEnities;
		duration: number;
		ingredients: EntityIngredient[];
	}) {
		this.id = id;
		this.duration = duration;
		this.ingredients = ingredients;
	}
}

class EntityIngredient {
	count: number;
	type: TEnities;
	willConsume: boolean;
	constructor(
		type: TEnities,
		{ count = 1, willConsume = true }: { count?: number; willConsume?: boolean } = {}
	) {
		this.count = count;
		this.type = type;
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
				count: 2,
				willConsume: false
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
				willConsume: false
			})
		]
	})
};

function getRecepieEntity(id: string): EntityIngredient | null {
	return recepies[id] || null;
}

type TRecepies = typeof recepies;

export { EntityRecepie, EntityIngredient, getRecepieEntity, recepies };
export type { TRecepies };
