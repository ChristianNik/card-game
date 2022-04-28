import Entity from "../classes/entity";

const persons = {
	villager: new Entity({
		id: "villager",
		category: "person",
		args: {
			title: "Villager"
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

const recources = {
	tree: new Entity({
		id: "tree",
		category: "recource",
		args: {
			title: "Tree"
		}
	}),
	rock: new Entity({
		id: "rock",
		category: "recource",
		args: {
			title: "Rock"
		}
	})
};

const ingredients = {
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
	brick: new Entity({
		id: "brick",
		category: "ingredient",
		args: {
			title: "Brick"
		}
	})
};

const buildings = {
	house: new Entity({
		id: "house",
		category: "building",
		args: {
			title: "House"
		}
	})
};

const entities = {
	...persons,
	...recources,
	...ingredients,
	...buildings,
	fallback: new Entity({
		id: "fallback",
		category: "fallback",
		args: {
			title: "Fallback"
		}
	})
};

type TEnities = keyof typeof entities;

export { entities };
export type { TEnities };
