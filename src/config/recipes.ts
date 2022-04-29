import CraftResult from "../classes/craft-result";
import Ingredient from "../classes/ingredient";
import Recipe from "../classes/recipe";

const recipes = [
	new Recipe({
		duration: 5,
		ingredients: [new Ingredient("villager", 1, false), new Ingredient("stone", 1, true)],
		produces: [new CraftResult("house", 1)],
		quantity: 1
	})
];

export { recipes };

type TRecepies = typeof recipes;

export type { TRecepies };
