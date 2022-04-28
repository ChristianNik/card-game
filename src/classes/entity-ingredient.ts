import { TEnities } from "../config/entities";

class EntityIngredient {
	count: number;
	type: TEnities;
	isConsumable: boolean;
	constructor(
		type: TEnities,
		{ count = 1, isConsumable = true }: { count?: number; isConsumable?: boolean } = {}
	) {
		this.count = count;
		this.type = type;
		this.isConsumable = isConsumable;
	}

	get willConsume() {
		return this.isConsumable;
	}
}

export default EntityIngredient;
