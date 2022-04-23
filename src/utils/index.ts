import CardStackManager from "../classes/card-stack-manager";

const generateId = () => Math.random().toString(16).substr(2, 8);

const drawDebugText = (
	ctx: CanvasRenderingContext2D,
	{ stackManager }: { stackManager?: CardStackManager } = {}
) => {
	const x = 0;
	const y = 0;
	const textList = [
		`Style:`,
		`- fillStyle: ${ctx.fillStyle}`,
		`- strokeStyle: ${ctx.strokeStyle}`,
		`- lineWidth: ${ctx.lineWidth}`,
		``,
		`Cards:`,
		`- Count: ${stackManager.cards.length}`,
		`- Stack count: ${stackManager.cardStack.length}`
	];

	const longest = textList.reduce((acc, t) => (acc < t.length ? t.length : acc), 0);

	ctx.fillStyle = "rgba(0,0,0,0.7)";
	ctx.fillRect(x, y, (20 * longest) / 2, textList.length * 22);

	ctx.font = `1.125rem Arial`;
	ctx.fillStyle = "#fff";

	textList.forEach((text, i) => {
		ctx.fillText(text, x + 10, y + 20 * i + 20);
	});
};

export { drawDebugText, generateId };
