const generateId = () => Math.random().toString(16).substr(2, 8);

const drawDebugTextFactory = (ctx: CanvasRenderingContext2D, canvas: any) => {
	return (position: "top-left" | "bottom-left", textList: string[]) => {
		let x = 0;
		let y = 0;
		if (position === "top-left") {
			x = 0;
			y = 0;
		} else if (position === "bottom-left") {
			x = 0;
			y = canvas.height - textList.length * 22;
		}

		return drawDebugText(ctx, x, y, textList);
	};
};

const drawDebugText = (ctx: CanvasRenderingContext2D, x: number, y: number, textList: string[]) => {
	const longest = textList.reduce((acc, t) => (acc < t.length ? t.length : acc), 0);

	ctx.fillStyle = "rgba(0,0,0,0.7)";
	ctx.fillRect(x, y, (20 * longest) / 2, textList.length * 22);

	ctx.font = `1.125rem Arial`;
	ctx.fillStyle = "#fff";

	textList.forEach((text, i) => {
		ctx.fillText(text, x + 10, y + 20 * i + 20);
	});
};

export { drawDebugTextFactory, drawDebugText, generateId };
