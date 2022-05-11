import Card from "../classes/card";
import CardStack from "../classes/card-stack";
import { isColliding } from "../utils/collision";
import { ListNode } from "../utils/linked-list";

class DragCardManager {
	isDown?: boolean;
	dragTarget?: ListNode<Card>;
	startX?: number;
	startY?: number;

	canvas: any;
	cardStacks: CardStack[];
	drawFn: any;

	hoverStack = new Set();

	constructor(canvas: any, cardStacks: CardStack[], drawFn: any) {
		this.canvas = canvas;
		this.cardStacks = cardStacks;
		this.drawFn = drawFn;

		if (!this.canvas) return;

		document.addEventListener("mousedown", e => this.handleMouseDown(e));
		document.addEventListener("mousemove", e => this.handleMouseMove(e));
		document.addEventListener("mouseup", () => this.handleMouseUp());
	}

	hitCard(x: number, y: number): ListNode<Card> | null {
		let target = null;

		this.cardStacks.forEach(stack => {
			stack.forEach(node => {
				const cardA = node.data;

				if (isColliding(x, y, 0, 0, cardA.x, cardA.y, cardA.width, cardA.height)) {
					target = node;
				}
			});
		});

		return target;
	}

	handleHoverOver(x: number, y: number): void {
		this.cardStacks.forEach(stack => {
			stack.forEach(node => {
				const cardA = node.data;

				if (isColliding(x, y, 0, 0, cardA.x, cardA.y, cardA.width, cardA.height)) {
					this.hoverStack.add(cardA.id);
				} else if (this.hoverStack.has(cardA.id)) {
					this.hoverStack.delete(cardA.id);
				}
			});
		});

		console.log(this.hoverStack);
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

		let node = this.dragTarget;
		while (node) {
			node.data.x += dx;
			node.data.y += dy;
			//
			node = node.next;
		}

		this.drawFn();
	}

	handleMouseUp(): void {
		this.dragTarget = null;
		this.isDown = false;
	}
}

export default DragCardManager;
