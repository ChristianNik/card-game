import { TEnities } from "../config/entities";

const globalevents = {
	emit: {
		craftingDone(type: TEnities, stackId: string) {
			const event = new CustomEvent("g_craftingdone", {
				detail: {
					type,
					stackId
				}
			});

			dispatchEvent(event);
		}
	}
};

export { globalevents };
