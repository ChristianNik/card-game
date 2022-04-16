CanvasRenderingContext2D.prototype.roundRect = function roundRect(x, y, w, h, r) {
	if (w < 2 * r) r = w / 2;
	if (h < 2 * r) r = h / 2;
	this.beginPath();
	this.moveTo(x + r, y);
	this.arcTo(x + w, y, x + w, y + h, r);
	this.arcTo(x + w, y + h, x, y + h, r);
	this.arcTo(x, y + h, x, y, r);
	this.arcTo(x, y, x + w, y, r);
	this.closePath();
	return this;
};

class CardRender {
	constructor(
		x,
		y,
		title = "Placeholder",
		primaryColor = "#61605B",
		accentColor = "#43423D",
		textColor = "#fff"
	) {
		this.x = x;
		this.y = y;
		this.title = title;
		this.primaryColor = primaryColor;
		this.accentColor = accentColor;
		this.textColor = textColor;
	}

	render(ctx) {
		const width = 182;
		const headerHeight = 40;
		const height = 227;
		const borderRadius = 5;

		// ground
		ctx.fillStyle = this.accentColor;
		ctx.roundRect(this.x, this.y, width, height, borderRadius).fill();

		// ground header
		ctx.fillStyle = this.primaryColor;
		ctx.roundRect(this.x, this.y, width, headerHeight, borderRadius).fill();

		// ground border
		ctx.lineWidth = 4;
		ctx.roundRect(this.x, this.y, width, height, borderRadius).stroke();

		// header border
		ctx.beginPath();
		ctx.moveTo(this.x, this.y + headerHeight);
		ctx.lineTo(this.x + width, this.y + headerHeight);
		ctx.stroke();

		// title
		ctx.fillStyle = this.textColor;
		ctx.font = `bold 1.125rem ui-sans-serif, system-ui, Arial`;
		ctx.textBaseline = "middle";
		ctx.fillText(this.title, this.x + 10, this.y + 22);

		// body circle
		ctx.fillStyle = this.primaryColor;
		ctx.beginPath();
		ctx.arc(this.x + width / 2, this.y + height / 2, 55, 0, 2 * Math.PI);
		ctx.fill();
	}
}

class VillagerCardRender extends CardRender {
	constructor(x, y) {
		super(x, y, "Villager", "#FEF08A", "#FEF9C3", "#000");
	}
}

export { CardRender, VillagerCardRender };
