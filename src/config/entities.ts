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
	}),
	electricity: new Entity({
		id: "electricity",
		category: "ingredient",
		args: {
			title: "Electricity"
		}
	}),
	water: new Entity({
		id: "water",
		category: "ingredient",
		args: {
			title: "Water"
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
	}),
	factory: new Entity({
		id: "factory",
		category: "building",
		args: {
			title: "Factory"
		}
	}),
	powerStation: new Entity({
		id: "powerStation",
		category: "building",
		args: {
			title: "Power Station"
		}
	}),
	pump: new Entity({
		id: "pump",
		category: "building",
		args: {
			title: "Pump"
		}
	}),
	mine: new Entity({
		id: "mine",
		category: "building",
		args: {
			title: "Mine"
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
