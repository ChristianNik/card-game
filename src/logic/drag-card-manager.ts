import Card from "../classes/card";
import CardStack from "../classes/card-stack";
import { isColliding } from "../utils/collision";
import { ListNode } from "../utils/linked-list";

class DragCardManager {
	isDown?: boolean;
	dragInfo?: {
		target?: ListNode<Card>;
		targetStack?: CardStack;
	} = {};
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

	hitCard(x: number, y: number): { targetStack: CardStack; target: ListNode<Card> } | null {
		let target = { targetStack: null, target: null };

		this.cardStacks.forEach(stack => {
			stack.forEach(node => {
				const cardA = node.data;

				if (isColliding(x, y, 0, 0, cardA.x, cardA.y, cardA.width, cardA.height)) {
					target = {
						targetStack: stack,
						target: node
					};
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

		// console.log(this.hoverStack);
	}

	handleMouseDown(e: MouseEvent): void {
		this.startX = e.offsetX - parseInt(this.canvas.clientLeft);
		this.startY = e.offsetY - parseInt(this.canvas.clientTop);

		const collision = this.hitCard(this.startX, this.startY);

		this.dragInfo = {
			target: collision.target,
			targetStack: collision.targetStack
		};
		this.isDown = !!this.dragInfo.target;
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

		let node = this.dragInfo.target;
		while (node) {
			node.data.x += dx;
			node.data.y += dy;
			//
			node = node.next;
		}

		this.drawFn();
	}

	handleMouseUp(): void {
		const values = [...this.hoverStack.values()];

		if (this.dragInfo.target) {
			const dragId = this.dragInfo.target.data.id;
			const targetStack = this.dragInfo.targetStack;

			if (targetStack.head.data.id === dragId) {
				console.log("do nothing");
			} else if (this.hoverStack.size === 1) {
				console.log("remove card from old stack");

				const index = targetStack.indexOf(dragId);
				const deletedNode = targetStack.deleteAt(index);

				console.log("move to new Stack", deletedNode);

				const stack = new CardStack();
				stack.insertAtBeginning(deletedNode.data);

				deletedNode.forEach(node => {
					stack.insertAtEnd(node.data);
				});

				this.cardStacks.push(stack);
			} else {
				console.log(`move <${values[0]}> to >${values[1]}<`);
			}
		}

		//
		this.dragInfo = null;
		this.isDown = false;
		//
		this.drawFn();
	}
}

export default DragCardManager;
