import { GameObject } from "./game-object";

class CardObject extends GameObject {
	constructor(
		x,
		y,
		{
			title = "Placeholder",
			primaryColor = "#61605B",
			accentColor = "#43423D",
			textColor = "#fff",
			parent = null,
			child = null
		} = {}
	) {
		super(x, y);
		this.title = title;
		this.primaryColor = primaryColor;
		this.accentColor = accentColor;
		this.textColor = textColor;

		this.borderRadius = 5;
		this.headerHeight = 40;
		this.parent = parent;
		this.child = child;
	}

	setParent(parent) {
		this.parent = parent;
	}

	setChild(child) {
		this.child = child;
	}

	_renderGroundBorder(ctx) {
		ctx.strokeStyle = "#000";
		ctx.lineWidth = 6;
		ctx.roundRect(this.x, this.y, this.width, this.height, this.borderRadius);
		ctx.stroke();
	}
	_renderGround(ctx) {
		ctx.fillStyle = this.accentColor;
		ctx.roundRect(this.x, this.y, this.width, this.height, this.borderRadius);
		ctx.fill();
	}
	_renderHeader(ctx) {
		ctx.fillStyle = this.primaryColor;
		ctx.roundRect(this.x, this.y, this.width, this.headerHeight, this.borderRadius);
		ctx.fill();
	}
	_renderHeaderBorder(ctx) {
		ctx.lineWidth = 3;
		ctx.beginPath();
		ctx.moveTo(this.x, this.y + this.headerHeight);
		ctx.lineTo(this.x + this.width, this.y + this.headerHeight);
		ctx.stroke();
	}
	_renderTitle(ctx) {
		ctx.fillStyle = this.textColor;
		ctx.font = `bold 1.125rem ui-sans-serif, system-ui, Arial`;
		ctx.textBaseline = "middle";
		ctx.fillText(this.title, this.x + 10, this.y + 22);
	}
	_renderBody(ctx) {
		ctx.fillStyle = this.primaryColor;
		ctx.beginPath();
		ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 55, 0, 2 * Math.PI);
		ctx.fill();
	}

	async _renderDevTools(ctx) {
		ctx.fillStyle = this.accentColor;
		ctx.roundRect(
			this.x + 1,
			this.y + this.headerHeight + 3,
			this.width - 1,
			this.height - this.headerHeight - 3,
			this.borderRadius
		);
		await ctx.fill();

		ctx.fillStyle = this.textColor;
		ctx.font = `bold 1.125rem ui-sans-serif, system-ui, Arial`;
		ctx.textBaseline = "middle";
		ctx.fillText(`ID: ${this._id}`, this.x + 10, this.y + this.headerHeight + 22);
	}

	render(ctx) {
		ctx.strokeStyle = "#000";
		this._renderGroundBorder(ctx);
		this._renderGround(ctx);
		this._renderBody(ctx);
		this._renderHeader(ctx);
		this._renderHeaderBorder(ctx);
		this._renderTitle(ctx);
	}

	renderHover(ctx) {
		ctx.lineWidth = 6;
		ctx.strokeStyle = "#fff";
		ctx.setLineDash([12, 12]);
		ctx.roundRect(
			this.x - 10,
			this.y - 10,
			this.width + 20,
			this.height + 20,
			this.borderRadius * 2
		);
		ctx.stroke();
		ctx.setLineDash([0, 0]);

		this._renderGroundBorder(ctx);
		this._renderGround(ctx);
		this._renderBody(ctx);

		this._renderDevTools(ctx);

		this._renderHeader(ctx);
		this._renderHeaderBorder(ctx);
		this._renderTitle(ctx);
	}
}
export { CardObject };
