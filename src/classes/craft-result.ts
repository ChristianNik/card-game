import { TEnities } from "../config/entities";

class CraftResult {
	id: TEnities;
	probability: number;
	constructor(id: TEnities, probability: number = 1) {
		this.id = id;
		this.probability = probability;
	}
}

export default CraftResult;
