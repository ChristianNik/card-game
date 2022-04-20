import { generateId } from "../utils";

class GameObject {
	constructor(x = 0, y = 0) {
		this.id = generateId();
		this.x = x;
		this.y = y;
		this.width = 182;
		this.height = 227;
		this.prevX = x;
		this.prevY = y;
	}
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	render(ctx) {
		ctx.fillStyle = "red";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	renderHover(ctx) {
		ctx.fillStyle = "green";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	clear(ctx) {
		ctx.save();
		ctx.clearRect(
			this.prevX,
			this.prevY,
			Math.floor(this.width - 1),
			Math.floor(this.height - 1)
		);
		ctx.restore();
		this.prevX = Math.floor(this.x);
		this.prevY = Math.floor(this.y);
	}
}

export { GameObject };
