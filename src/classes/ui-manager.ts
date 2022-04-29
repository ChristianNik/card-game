import { drawDebugTextFactory } from "../utils";

class UIManager {
	canvas: any;
	ctx: CanvasRenderingContext2D;
	refs: any = {};
	Text: any;
	constructor(selector) {
		this.canvas = this.canvas = document.querySelector(selector);
		this.ctx = this.canvas.getContext("2d");
	}

	init(refs: any) {
		if (!this.ctx) return;
		this.canvas.width = innerWidth;
		this.canvas.height = innerHeight;

		const Text = drawDebugTextFactory(this.ctx, this.canvas);
		this.Text = Text;

		this.refs.stackManager = refs.stackManager;
		this.refs.hover = refs.hover;
	}

	draw() {
		if (!this.ctx) return;

		const { stackManager, hover } = this.refs;

		this.ctx.save();
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.Text?.("top-left", [
			`Style:`,
			`- fillStyle: ${this.ctx.fillStyle}`,
			`- strokeStyle: ${this.ctx.strokeStyle}`,
			`- lineWidth: ${this.ctx.lineWidth}`,
			``,
			`Cards:`,
			`- Count: ${stackManager.cards.length}`,
			`- Stack count: ${stackManager.cardStack.length}`
		]);

		const card = stackManager.getCardById(hover.currentId());
		if (!card) return;

		this.ctx.font = `1.125rem Arial`;
		this.ctx.fillStyle = "#fff";

		this.ctx.restore();
	}
}

export default UIManager;
