import { TEnities } from "../config/entities";

class EntityIngredient {
	count: number;
	type: TEnities;
	isConsumable: boolean;
	quantity: number;
	constructor(
		type: TEnities,
		{
			count = 1,
			isConsumable = true,
			quantity = 1
		}: { count?: number; isConsumable?: boolean; quantity?: number } = {}
	) {
		this.count = count;
		this.type = type;
		this.isConsumable = isConsumable;
		this.quantity = quantity;
	}

	use() {
		if (this.quantity > 0) {
			this.quantity--;
		}
	}

	get willConsume() {
		if (!this.isConsumable) return false;
		return this.quantity <= 0;
	}
}

export default EntityIngredient;
