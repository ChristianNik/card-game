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
		this.cardStacks = {};
		/**
		 * @deprecated
		 */
		this.hoverId = null;
		this.isDragging = false;

		this.hoverStack = new Set();
		this.hoverTargetId = null;
	}
	//
	//
	//
	// BASE
	//
	init(id) {
		this.canvas = document.getElementById(id);
		this.ctx = this.canvas.getContext("2d");
		this.canvas.width = window.innerWidth;
		this.canvas.height = 500;
	}

	findElementById(id) {
		return this.elements.find(e => e._id === id);
	}

	getCardById(id) {
		if (!id) return null;
		return this.cards().find(c => c._id === id) || null;
	}

	elevateElementById(id) {
		this.elements.sort((a, b) => (a._id === id ? 1 : -1));
	}

	cards() {
		return Object.keys(this.cardStacks)
			.map(key => this.cardStacks[key].cards)
			.flat();
	}
	//
	//
	//
	// UI
	//
	resetStyles() {
		this.ctx.fillStyle = "#000";
		this.ctx.strokeStyle = "#000";
		this.ctx.lineWidth = 1;
		this.ctx.font = "";
		this.ctx.setLineDash([0, 0]);
	}

	renderGround() {
		this.ctx.fillStyle = "#AFC5FF";
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	renderCards() {
		this.renderGround();

		Object.keys(this.cardStacks).forEach(key => {
			this.resetStyles();
			const stack = this.cardStacks[key];

			stack.cards.forEach(card => {
				this.ctx.fill(card.render(this.ctx));
			});
		});
	}

	addCard(card, stack = generateId()) {
		if (!this.cardStacks[stack]) {
			this.cardStacks[stack] = {
				x: card.x,
				y: card.y,
				cards: []
			};
		} else {
			const currentStack = this.cardStacks[stack];

			const parent = currentStack.cards[currentStack.cards.length - 1];
			card.y = parent.y + parent.headerHeight;
			card.setParent(parent);
		}

		this.cardStacks[stack].cards.push(card);
		this.renderCards();
	}
	//
	// HOVER
	//
	addHoverId(id) {
		if (!this.isDragging) {
			this.hoverTargetId = id;
		}
		if (this.hoverStack.has(id)) return;

		this.hoverStack.add(id);
		const sortedStack = [...this.hoverStack].sort((a, b) => {
			const cardA = this.getCardById(a);
			const cardB = this.getCardById(b);

			return cardA.parent?._id === cardB._id ? -1 : 1;
		});
		this.hoverStack = new Set(sortedStack);
	}
	removeHoverId(id) {
		if (this.hoverTargetId === id) {
			this.hoverTargetId = null;
		}

		if (!this.hoverStack.has(id)) return;
		this.hoverStack.delete(id);
	}
	hoverTarget() {
		return this.getCardById(this.hoverTargetId);
	}
	//
	//
	//
	// HANDLER
	//
	handleMouseMove(event) {
		this.cards().forEach(card => {
			const matchX = event.offsetX >= card.x && event.offsetX <= card.x + card.width;
			const matchY = event.offsetY >= card.y && event.offsetY <= card.y + card.height;
			// add all id we are curently hovering on
			if (matchX && matchY) {
				this.addHoverId(card._id);
			} else {
				this.removeHoverId(card._id);
			}
		});
		console.log(this.hoverStack);

		this.elements.forEach(element => {
			const matchX = event.offsetX >= element.x && event.offsetX <= element.x + element.width;
			const matchY =
				event.offsetY >= element.y && event.offsetY <= element.y + element.height;
			// add all id we are curently hovering on
			if (matchX && matchY) {
				if (this.hoverStack.has(element._id)) return;
				this.hoverStack.add(element._id);
			} else {
				if (!this.hoverStack.has(element._id)) return;
				this.hoverStack.delete(element._id);
			}
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
		this.handleDragging(event);
	}

	handleDragging(event) {
		if (this.isDragging) {
			const card = this.hoverTarget();
			if (!card) return;

			// TODO: remove from stack
			// element.parent?.setChild?.(null);
			// card.setParent(null);

			card.x = event.offsetX - card.width / 2;
			card.y = event.offsetY - card.height / 2;
			this.renderCards();
		}
	}

	handleClick(event) {
		console.log(this.hoverTarget());
	}

	handleMouseDown(event) {
		this.isDragging = true;
		if (!this.hoverId) return;

		// dont elevate parent with childs
		const element = this.findElementById(this.hoverId);
		if (element.child) return;

		this.elevateElementById(this.hoverId);
	}
	handleMouseUp(event) {
		this.isDragging = false;
		if (this.hoverStack.size < 2) return;

		const ids = [...this.hoverStack];
		this.stackCards(ids[0], ids[1]);
	}

	stackCards(currentId, targetId) {
		// const current = this.findElementById(currentId);
		// const target = this.findElementById(targetId);
		// if (current.parent?._id === targetId) return;
		// current.setParent(target);
		// target.setChild(current);
		// current.x = target.x;
		// current.y = target.y + current.parent.headerHeight;
		// this.render();
	}
}

export { Game, stack, handleStackChange, dropToNewStack, craftDone };
