import { categories } from "../config/categories";
import { entities, TEnities } from "../config/entities";
import { generateId } from "../utils";

interface CardOptions {
	x?: number;
	y?: number;
	title?: string;
	primaryColor?: string;
	accentColor?: string;
	textColor?: string;
	type?: TEnities;
}

class Card {
	id = generateId();
	x: number;
	y: number;
	width = 182;
	height = 227;
	borderWidth = 4;
	borderRadius = 5;
	headerHeight = 40;

	title = "Placeholder";
	primaryColor = categories.fallback.args.bg2;
	accentColor = categories.fallback.args.bg1;
	textColor = categories.fallback.args.color;
	type: TEnities = "fallback";

	constructor(options?: CardOptions) {
		this.x = options.x || 0;
		this.y = options.y || 0;

		options?.title && (this.title = options.title);
		options?.accentColor && (this.accentColor = options.accentColor);
		options?.primaryColor && (this.primaryColor = options.primaryColor);
		options?.textColor && (this.textColor = options.textColor);
		options?.type && (this.type = options.type);
	}

	static fromType(type: TEnities, x: number = 0, y: number = 0) {
		const entity = entities[type];

		return new Card({
			x,
			y,
			title: entity.args.title,
			accentColor: entity.category.args.bg1,
			primaryColor: entity.category.args.bg2,
			textColor: entity.category.args.color,
			type: type
		});
	}

	setPosition(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	draw(ctx: CanvasRenderingContext2D) {
		const _drawGround = () => {
			ctx.fillStyle = this.accentColor;
			ctx.lineWidth = this.borderWidth;
			ctx.fillRect(this.x, this.y, this.width, this.height);
			ctx.strokeRect(this.x, this.y, this.width, this.height);
		};
		const _drawHeader = () => {
			ctx.fillStyle = this.primaryColor;
			ctx.fillRect(this.x, this.y, this.width, this.headerHeight);
			ctx.strokeRect(this.x, this.y, this.width, this.headerHeight);
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
			ctx.textAlign = "right";
			ctx.textBaseline = "top";
			ctx.font = `bold 0.7rem ui-sans-serif, system-ui, Arial`;
			ctx.fillText(
				this.id,
				this.x + this.width - this.borderRadius,
				this.y + this.borderRadius
			);
		};

		_drawGround();
		_drawBody();
		_drawHeader();
		_drawTitle();
		_drawId();
	}

	update(ctx: CanvasRenderingContext2D) {
		this.draw(ctx);
	}
}

export default Card;
