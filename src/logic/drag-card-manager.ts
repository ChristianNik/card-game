import Card from "../classes/card";

class DragCardManager {
	isDown?: boolean;
	dragTarget?: Card;
	startX?: number;
	startY?: number;

	canvas: any;
	cards: Card[];
	drawFn: any;

	constructor(canvas: any, cards: Card[], drawFn: any) {
		this.canvas = canvas;
		this.cards = cards;
		this.drawFn = drawFn;

		if (!this.canvas) return;

		document.addEventListener("mousedown", e => this.handleMouseDown(e));
		document.addEventListener("mousemove", e => this.handleMouseMove(e));
		document.addEventListener("mouseup", () => this.handleMouseUp());
	}

	hitCard(x: number, y: number) {
		let isTarget = null;
		for (let i = 0; i < this.cards.length; i++) {
			const box = this.cards[i];
			if (x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height) {
				this.dragTarget = box;
				isTarget = true;
				break;
			}
		}
		return isTarget;
	}

	handleMouseDown(e: MouseEvent) {
		this.startX = e.offsetX - parseInt(this.canvas.clientLeft);
		this.startY = e.offsetY - parseInt(this.canvas.clientTop);
		this.isDown = this.hitCard(this.startX, this.startY);
	}

	handleMouseMove(e: MouseEvent) {
		if (!this.isDown) return;

		const mouseX = e.offsetX - parseInt(this.canvas.clientLeft);
		const mouseY = e.offsetY - parseInt(this.canvas.clientTop);
		const dx = mouseX - this.startX;
		const dy = mouseY - this.startY;
		this.startX = mouseX;
		this.startY = mouseY;
		this.dragTarget.x += dx;
		this.dragTarget.y += dy;
		this.drawFn();
	}

	handleMouseUp() {
		this.dragTarget = null;
		this.isDown = false;
	}
}

export default DragCardManager;
