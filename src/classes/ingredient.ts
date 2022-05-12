import { TEnities } from "../config/entities";

class Ingredient {
	id: TEnities;
	count?: number = 1;
	isConsumed?: boolean = true;
	constructor(id: TEnities, count: number = 1, isConsumed: boolean = true) {
		this.id = id;
		this.count = count;
		this.isConsumed = isConsumed;
	}
}

export default Ingredient;
