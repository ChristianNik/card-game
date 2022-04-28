import { TEnities } from "../config/entities";
import { CraftingSuccessEvent } from "../types/events";

const globalevents = {
	emit: {
		craftingDone(type: TEnities, stackId: string, x: number, y: number, splitStack: boolean) {
			const event: CraftingSuccessEvent = new CustomEvent("g_craftingdone", {
				detail: {
					type,
					stackId,
					position: [x, y],
					splitStack: splitStack
				}
			});

			dispatchEvent(event);
		}
	}
};

export { globalevents };
