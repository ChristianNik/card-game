import { TEnities } from "../config/entities";

interface CraftingSuccessEvent extends CustomEvent {
	detail: {
		type: TEnities;
		stackId: string;
		position: number[];
		splitStack: boolean;
	};
}

export type { CraftingSuccessEvent };
