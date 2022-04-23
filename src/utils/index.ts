import CardDragManager from "../classes/card-drag-manager";
import CardStackManager from "../classes/card-stack-manager";

const generateId = () => Math.random().toString(16).substr(2, 8);

const drawDebugText = (
	ctx: CanvasRenderingContext2D,
	{ stackManager }: { dragManager?: CardDragManager; stackManager?: CardStackManager } = {}
) => {
	ctx.font = `1.125rem Arial`;
	[
		`Style:`,
		`fillStyle: ${ctx.fillStyle}`,
		`strokeStyle: ${ctx.strokeStyle}`,
		`lineWidth: ${ctx.lineWidth}`,
		`Cards:`,
		`card count: ${stackManager.cards.length}`,
		`cardStack count: ${stackManager.cardStack.length}`
	].forEach((text, i) => {
		ctx.fillText(text, 10, 20 * i + 20);
	});
};

export { drawDebugText, generateId };
