import { TEnities } from "../config/entities";
import EntityIngredient from "./entity-ingredient";

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

export default EntityRecepie;
