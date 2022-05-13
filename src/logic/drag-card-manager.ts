import Card from "../classes/card";
import CraftableCardStack from "../classes/craftable-card-stack";
import { isColliding } from "../utils/collision";
import { ListNode } from "../utils/linked-list";

class DragCardManager {
	isDown?: boolean;
	dragInfo?: {
		target?: ListNode<Card>;
		targetStack?: CraftableCardStack;
	} = {};
	startX?: number;
	startY?: number;

	canvas: any;
	cardStacks: CraftableCardStack[];
	drawFn: any;

	hoverStack = new Set<string>();

	constructor(canvas: any, cardStacks: CraftableCardStack[], drawFn: any) {
		this.canvas = canvas;
		this.cardStacks = cardStacks;
		this.drawFn = drawFn;

		if (!this.canvas) return;

		document.addEventListener("mousedown", e => this.handleMouseDown(e));
		document.addEventListener("mousemove", e => this.handleMouseMove(e));
		document.addEventListener("mouseup", () => this.handleMouseUp());
	}

	hitCard(
		x: number,
		y: number
	): { targetStack: CraftableCardStack; target: ListNode<Card> } | null {
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

		this.cardStacks = this.cardStacks.sort(a =>
			a.id === this.dragInfo?.targetStack?.id ? 1 : 0
		);
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

	getStackById(id: string): CraftableCardStack | null {
		return this.cardStacks.find(s => s.id === id);
	}

	getStackByCardId(id: string): CraftableCardStack | null {
		return this.cardStacks.find(s => s.has(id));
	}

	moveToStack(cardId: string, dropId?: string) {
		const currentStack = this.getStackByCardId(cardId);
		const targetStack = this.getStackById(this.getStackByCardId(dropId)?.id);

		const index = currentStack.indexOf(cardId);
		const deletedNode = currentStack.deleteAt(index);

		if (!dropId) {
			const stack = new CraftableCardStack();
			stack.insertAtBeginning(deletedNode.data);

			deletedNode.forEach(node => {
				stack.insertAtEnd(node.data);
			});

			this.cardStacks.push(stack);
		} else {
			let node = deletedNode;
			while (node) {
				targetStack.insertAtEnd(node.data);
				//
				node = node.next;
			}
		}
	}

	handleMouseUp(): void {
		const copyOfIds = new Set<string>([...this.hoverStack.values()]);

		if (this.dragInfo.target) {
			const dragId = this.dragInfo.target.data.id;
			const targetStack = this.dragInfo.targetStack;

			copyOfIds.delete(dragId);

			const values = [...copyOfIds.values()];
			const dropId = values[values.length - 1];

			const index = targetStack.indexOf(dragId);
			if (this.hoverStack.size === 1 && index !== 0) {
				this.moveToStack(dragId);
			} else if (this.hoverStack.size > 1) {
				this.moveToStack(dragId, dropId);
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
