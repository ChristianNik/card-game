import { TEnities } from "../config/entities";
import { generateId } from "../utils";
import { LinkedList, ListNode } from "../utils/linked-list";
import Card from "./card";

class CardStack extends LinkedList<Card> {
	id = generateId();
	constructor() {
		super();
	}

	insertAtEnd(data: Card): ListNode<Card> {
		if (this.head) {
			data.x = this.head.data.x;
			data.y = this.head.data.y + data.headerHeight * this.length;
		}

		return super.insertAtEnd(data);
	}

	indexOf(id: string): number {
		let index = -1;
		this.forEach((node, i) => {
			if (index === -1 && node.data.id === id) {
				index = i;
			}
		});

		return index;
	}

	has(id: string): boolean {
		return this.indexOf(id) !== -1;
	}

	setPosition(x: number, y: number) {
		this.head.data.x = x;
		this.head.data.y = y;

		this.forEach((node, i) => {
			const x = this.head.data.x;
			const y = this.head.data.y + this.head.data.headerHeight * i;
			node.data.setPosition(x, y);
		});
	}

	get ingredientIds(): TEnities[] {
		let ingredients: TEnities[] = [];
		this.forEach(node => {
			ingredients.push(node.data.type);
		});

		return ingredients;
	}

	get stackIngredients(): { [key: string]: number } {
		const ingredientsWithCount = this.ingredientIds.reduce((acc, id) => {
			if (!acc[id]) {
				acc[id] = 0;
			}
			acc[id]++;

			return acc;
		}, {});

		return ingredientsWithCount;
	}

	get x() {
		return this.head?.data?.x;
	}

	get y() {
		return this.head?.data?.y;
	}

	get width() {
		return this.head?.data?.width;
	}

	get height() {
		let height = this.head?.data?.height;

		if (this.size > 1) {
			height += this.size * this.head?.data?.headerHeight;
		}

		return height;
	}

	draw(ctx: CanvasRenderingContext2D): void {
		this.forEach(node => {
			ctx.save();
			node.data.draw(ctx);
			ctx.restore();
		});
	}
}

export default CardStack;
