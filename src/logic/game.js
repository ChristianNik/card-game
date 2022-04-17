import { ref } from "vue";
import { generateId } from "../utils";

class CardModel {
	constructor(type = "default") {
		this._id = generateId();
		this._stackId;
		this.type = type;
	}

	setStackId(id) {
		this._stackId = id;
	}
}

class CardStackModel {
	constructor() {
		this._id = generateId();
		this.cards = [];
	}

	addCard(card) {
		card.setStackId(this._id);
		this.cards.push(card);
		return this;
	}

	pop() {
		return this.cards.pop();
	}

	findById(id) {
		return this.cards.find(c => c._id === id);
	}

	destroy() {
		this.cards = this.cards.filter(c => c.type === "villager");
		const villagerCount = this.cards.length;
		if (villagerCount > 1) {
			this.cards = this.cards.slice(0, 1);
		}
		return villagerCount - 1;
	}
}

const stack = ref([
	new CardStackModel().addCard(new CardModel("villager")),
	new CardStackModel().addCard(new CardModel("villager")),
	new CardStackModel().addCard(new CardModel("tree")),
	new CardStackModel().addCard(new CardModel("tree")),
	new CardStackModel()
		.addCard(new CardModel("stone"))
		.addCard(new CardModel("stone"))
		.addCard(new CardModel("stone"))
]);

function handleStackChange(event) {
	const current = stack.value.find(stack => stack._id == event.current);
	const target = stack.value.find(stack => stack._id == event.target);

	const card = current.pop();
	if (!card) return;
	target.addCard(card);
}

function dropToNewStack(event) {
	const targetId = event.dataTransfer.getData("cardID");
	const current = stack.value.find(stack => stack._id == targetId);

	const card = current?.pop();

	if (!card) return;
	stack.value = [
		...stack.value.filter(s => s.cards.length > 0),
		new CardStackModel().addCard(card)
	];
}

function craftDone(event) {
	const current = stack.value.find(stack => stack._id == event.current);

	const villagers = [];
	for (let i = 0; i < current.destroy(); i++) {
		villagers.push(new CardStackModel().addCard(new CardModel("villager")));
	}

	stack.value = [
		...stack.value.filter(s => s.cards.length > 0),
		...villagers,
		new CardStackModel().addCard(new CardModel(event.type))
	];
}

class Game {
	constructor() {
		this.elements = [];
		this.hoverId = null;
		this.isDragging = false;
	}

	init(id) {
		this.canvas = document.getElementById(id);
		this.ctx = this.canvas.getContext("2d");
		this.canvas.width = window.innerWidth;
		this.canvas.height = 500;
	}

	findElementById(id) {
		return this.elements.find(e => e._id === id);
	}

	elevateElementById(id) {
		this.elements.sort((a, b) => (a._id === id ? 1 : -1));
	}

	render() {
		this.ctx.fillStyle = "#AFC5FF";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		this.elements.forEach(element => {
			// resets
			this.ctx.fillStyle = "#000";
			this.ctx.strokeStyle = "#000";
			this.ctx.lineWidth = 1;
			this.ctx.font = "";
			this.ctx.setLineDash([0, 0]);
			//

			// TODO: refactor
			if (element.parent) {
				element.x = element.parent.x;
				element.y = element.parent.y + element.parent.headerHeight;
				this.elevateElementById(element._id);
				this.ctx.fill(element.parent.render(this.ctx));
				const el =
					this.hoverId == element._id
						? element.renderHover(this.ctx)
						: element.render(this.ctx);
				this.ctx.fill(el);
			} else {
				this.ctx.fill(element.render(this.ctx));
				const el =
					this.hoverId == element._id
						? element.renderHover(this.ctx)
						: element.render(this.ctx);
				this.ctx.fill(el);
			}
		});
	}

	addGameObject(element) {
		this.elements.push(element);
		this.render();
	}

	handleMouseMove(event) {
		this.elements.forEach(element => {
			const matchX = event.offsetX >= element.x && event.offsetX <= element.x + element.width;
			const matchY =
				event.offsetY >= element.y && event.offsetY <= element.y + element.height;

			if (matchX && matchY && !this.isDragging) {
				this.hoverId = element._id;
				this.ctx.fill(element.renderHover?.(this.ctx));
				this.render();
				return;
			}
			if (this.hoverId === element._id && !this.isDragging) {
				this.hoverId = null;
				this.render();
			}
		});

		//drag
		if (this.isDragging) {
			const element = this.findElementById(this.hoverId);
			if (!element) return;

			element.parent = null;

			element.x = event.offsetX - element.width / 2;
			element.y = event.offsetY - element.height / 2;
			this.render();
		}
	}

	handleClick(event) {
		console.log(this.hoverId);
	}

	handleMouseDown(event) {
		this.isDragging = true;
		if (!this.hoverId) return;

		this.elevateElementById(this.hoverId);
	}
	handleMouseUp(event) {
		this.isDragging = false;
	}

	handleStack() {
		const current = this.elements[2];
		const target = this.elements[1];

		target.setParent(current);
		this.render();
	}
}

export { Game, stack, handleStackChange, dropToNewStack, craftDone };
