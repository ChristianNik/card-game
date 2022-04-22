import { entities, TEnities } from "../config/entities";
import { generateId } from "../utils";

interface CardOptions {
	title?: string;
	primaryColor?: string;
	accentColor?: string;
	textColor?: string;
}

class Card {
	id = generateId();
	x: number;
	y: number;
	width = 182;
	height = 227;
	borderWidth = 6;
	borderRadius = 5;
	headerHeight = 40;

	title = "Placeholder";
	primaryColor = "#61605B";
	accentColor = "#43423D";
	textColor = "#fff";

	constructor(x: number, y: number, options?: CardOptions) {
		this.x = x;
		this.y = y;

		options?.title && (this.title = options.title);
		options?.accentColor && (this.accentColor = options.accentColor);
		options?.primaryColor && (this.primaryColor = options.primaryColor);
		options?.textColor && (this.textColor = options.textColor);
	}

	static fromType(type: TEnities, x: number = 0, y: number = 0) {
		const entity = entities[type];

		return new Card(x, y, {
			title: entity.args.title,
			accentColor: entity.category.args.bg1,
			primaryColor: entity.category.args.bg2,
			textColor: entity.category.args.color
		});
	}

	draw(ctx: CanvasRenderingContext2D) {
		const _drawGroundBorder = () => {
			ctx.strokeStyle = "#000";
			ctx.lineWidth = this.borderWidth;
			ctx.rect(this.x, this.y, this.width, this.height);
			ctx.stroke();
		};
		const _drawGround = () => {
			ctx.fillStyle = this.accentColor;
			ctx.rect(this.x, this.y, this.width, this.height);
			ctx.fill();
		};
		const _drawHeader = () => {
			ctx.fillStyle = this.primaryColor;
			ctx.rect(this.x, this.y, this.width, this.headerHeight);
			ctx.fill();
		};
		const _drawHeaderBorder = () => {
			ctx.lineWidth = this.borderWidth / 2;
			ctx.beginPath();
			ctx.moveTo(this.x, this.y + this.headerHeight);
			ctx.lineTo(this.x + this.width, this.y + this.headerHeight);
			ctx.stroke();
		};
		const _drawTitle = () => {
			ctx.fillStyle = this.textColor;
			ctx.font = `bold 1.125rem ui-sans-serif, system-ui, Arial`;
			ctx.textBaseline = "middle";
			ctx.fillText(this.title, this.x + 10, this.y + 22);
		};
		const _drawBody = () => {
			ctx.fillStyle = this.primaryColor;
			ctx.beginPath();
			ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 55, 0, 2 * Math.PI);
			ctx.fill();
		};
		const _drawId = () => {
			const padding = 6;

			ctx.textAlign = "right";
			ctx.textBaseline = "top";
			ctx.font = `bold 0.7rem ui-sans-serif, system-ui, Arial`;
			ctx.fillText(this.id, this.x + this.width - padding, this.y);
		};

		_drawGroundBorder();
		_drawGround();
		_drawBody();
		_drawHeader();
		_drawHeaderBorder();
		_drawTitle();
		_drawId();
	}

	update(ctx: CanvasRenderingContext2D) {
		this.draw(ctx);
	}
}

export default Card;
