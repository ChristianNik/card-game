import { generateId } from "../utils";

class GameObject {
	constructor(x = 0, y = 0) {
		this._id = generateId();
		this.x = x;
		this.y = y;
		this.width = 182;
		this.height = 227;
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
}

export { GameObject };
