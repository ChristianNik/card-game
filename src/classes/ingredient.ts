import { TEnities } from "../config/entities";

class Ingredient {
	id: TEnities;
	count: number;
	isConsumed: boolean;
	constructor(id: TEnities, count: number, isConsumed: boolean) {
		this.id = id;
		this.count = count;
		this.isConsumed = isConsumed;
	}
}

export default Ingredient;
