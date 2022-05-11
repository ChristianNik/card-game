import Card from "../classes/card";

class DragCardManager {
	isDown?: boolean;
	dragTarget?: Card;
	startX?: number;
	startY?: number;

	canvas: any;
	cards: Card[];
	drawFn: any;

	hoverStack = new Set();

	constructor(canvas: any, cards: Card[], drawFn: any) {
		this.canvas = canvas;
		this.cards = cards;
		this.drawFn = drawFn;

		if (!this.canvas) return;

		document.addEventListener("mousedown", e => this.handleMouseDown(e));
		document.addEventListener("mousemove", e => this.handleMouseMove(e));
		document.addEventListener("mouseup", () => this.handleMouseUp());
	}

	hitCard(x: number, y: number): Card | null {
		let target = null;

		for (let i = this.cards.length - 1; i >= 0; i--) {
			const box = this.cards[i];
			if (x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height) {
				target = box;
				break;
			}
		}
		return target;
	}

	handleHoverOver(x: number, y: number): void {
		for (let i = 0; i < this.cards.length; i++) {
			const box = this.cards[i];
			if (
				x >= box.x &&
				x <= box.x + box.width &&
				y >= box.y &&
				y <= box.y + box.height &&
				box.id !== this.dragTarget?.id
			) {
				this.hoverStack.add(box.id);
			} else if (this.hoverStack.has(box.id)) {
				this.hoverStack.delete(box.id);
			}
		}
	}

	handleMouseDown(e: MouseEvent): void {
		this.startX = e.offsetX - parseInt(this.canvas.clientLeft);
		this.startY = e.offsetY - parseInt(this.canvas.clientTop);
		this.dragTarget = this.hitCard(this.startX, this.startY);
		this.isDown = !!this.dragTarget;
	}

	handleMouseMove(e: MouseEvent): void {
		const mouseX = e.offsetX - parseInt(this.canvas.clientLeft);
		const mouseY = e.offsetY - parseInt(this.canvas.clientTop);
		this.handleHoverOver(mouseX, mouseY);

		if (!this.isDown) return;
		const dx = mouseX - this.startX;
		const dy = mouseY - this.startY;
		this.startX = mouseX;
		this.startY = mouseY;
		this.dragTarget.x += dx;
		this.dragTarget.y += dy;
		this.drawFn();
	}

	handleMouseUp(): void {
		this.dragTarget = null;
		this.isDown = false;
	}
}

export default DragCardManager;
