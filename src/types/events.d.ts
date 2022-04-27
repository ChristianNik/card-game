import { TEnities } from "../config/entities";

interface CraftingSuccessEvent extends CustomEvent {
	detail: {
		type: TEnities;
		stackId: string;
		position: number[];
	};
}

export type { CraftingSuccessEvent };
