import Ingredient from "../classes/ingredient";
import Recipe from "../classes/recipe";

const SINGLE_VILLAGER: Ingredient = new Ingredient("villager", 1, false);

const recipes = [
	new Recipe({
		produces: ["stone"],
		ingredients: [SINGLE_VILLAGER, "rock"],
		duration: 5,
		quantity: 2
	}),
	new Recipe({
		produces: ["wood"],
		ingredients: [SINGLE_VILLAGER, "tree"],
		duration: 5,
		quantity: 3
	}),
	new Recipe({
		produces: ["stick"],
		ingredients: [SINGLE_VILLAGER, "wood"],
		duration: 5,
		quantity: 1
	}),
	new Recipe({
		produces: ["house"],
		ingredients: [SINGLE_VILLAGER, { count: 2, id: "stone" }, { count: 2, id: "wood" }],
		duration: 5,
		quantity: 1
	}),
	new Recipe({
		produces: ["baby"],
		ingredients: [
			{ count: 2, isConsumed: false, id: "villager" },
			{ count: 1, isConsumed: false, id: "house" }
		],
		duration: 5,
		quantity: 1
	}),
	new Recipe({
		produces: ["villager"],
		ingredients: [
			{ count: 1, isConsumed: true, id: "baby" },
			{ count: 1, isConsumed: false, id: "house" }
		],
		duration: 5,
		quantity: 1
	})
];

export { recipes };

type TRecepies = typeof recipes;

export type { TRecepies };
