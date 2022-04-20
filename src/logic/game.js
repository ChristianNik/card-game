import { generateId } from "../utils";

class Game {
	constructor() {
		this.cards = [];
		this.isDragging = false;
		this.isMouseDown = false;

		this.hoverStack = new Set();
		this.hoverTargetId = null;

		this._start;
		this._previousTimeStamp;
	}
	//
	//
	//
	// BASE
	//
	init(mainId, bgId) {
		this.canvas = document.getElementById(mainId);
		this.ctx = this.canvas.getContext("2d");
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		this.bgcanvas = document.getElementById(bgId);
		this.bgctx = this.bgcanvas.getContext("2d");
		this.bgcanvas.width = window.innerWidth;
		this.bgcanvas.height = window.innerHeight;
	}

	getCardById(id) {
		if (!id) return null;
		return this.cards.find(c => c._id === id) || null;
	}

	elevateElementById(id) {
		// TODO: refactor
		this.cards.sort((a, b) => (a._id === id ? 1 : -1));
	}
	//
	//
	//
	// UI
	//

	initRender() {
		this.renderGround();
		this.renderCards();
	}
	renderGround() {
		this.bgctx.fillStyle = "#A7F3D0";
		this.bgctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	}

	renderCards(timestamp) {
		if (this._start === undefined) {
			this._start = timestamp;
		}

		if (this.previousTimeStamp !== timestamp) {
			this.previousTimeStamp = timestamp;

			this.cards.forEach(card => {
				this.ctx.save();
				this.ctx.fill(card.render(this.ctx));
				this.ctx.restore();
			});
		}
		requestAnimationFrame(timestamp => this.renderCards(timestamp));
	}

	addCard(card, stackId = generateId()) {
		const parent = this.cards
			.filter(c => c.stackId === stackId)
			.reverse()
			.find(c => c.stackId === stackId);

		card.setStackId(stackId);
		if (parent) {
			card.y = parent.y + parent.headerHeight;
			parent.setChild(card);
		}

		this.cards.push(card);
		card.render(this.ctx);
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

			if (cardA._id === this.hoverTargetId) return -1;
			return cardA?._id === cardB.child?._id ? -1 : 1;
		});
		this.hoverStack = new Set(sortedStack);
	}
	removeHoverId(id) {
		if (this.hoverTargetId === id && !this.isDragging) {
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
		this.isDragging = this.isMouseDown;

		this.cards.forEach(card => {
			const matchX = event.offsetX >= card.x && event.offsetX <= card.x + card.width;
			const matchY = event.offsetY >= card.y && event.offsetY <= card.y + card.height;
			// add all id we are curently hovering on
			if (matchX && matchY) {
				this.addHoverId(card._id);
			} else {
				this.removeHoverId(card._id);
			}
		});

		//drag
		this.handleDragging(event);
	}

	setChildrenPosition(card, x, y) {
		if (!card) return;

		card.x = x;
		card.y = y;

		if (card?.child) {
			this.setChildrenPosition(card.child, card.x, card.y + card.headerHeight);
		}
	}

	handleDragging(event) {
		if (this.isDragging) {
			const card = this.hoverTarget();
			if (!card) return;

			const parent = this.cards.find(card => card.child?._id === this.hoverTargetId);
			parent?.setChild(null);

			if (this.cards.find(c => c._id !== card._id && c.stackId == card.stackId)) {
				card.setStackId(generateId());
			}

			card.x = event.offsetX - card.width / 2;
			card.y = event.offsetY - card.headerHeight / 2;

			this.setChildrenPosition(card.child, card.x, card.y + card.headerHeight);
		}
	}

	handleClick(event) {
		// console.log(this.hoverTarget());
	}

	handleMouseDown(event) {
		this.isMouseDown = true;
		if (!this.hoverTargetId) return;

		// dont elevate parent with childs
		const element = this.getCardById(this.hoverTargetId);
		if (element?.child) return;

		this.elevateElementById(this.hoverTargetId);
	}
	handleMouseUp(event) {
		this.isMouseDown = false;

		if (this.isDragging) {
		if (this.hoverStack.size <= 1) {
			const parent = this.cards.find(card => card.child?._id === this.hoverTargetId);
			parent?.setChild(null);
			return;
		}
		const ids = [...this.hoverStack];
		this.stackCards(ids[0], ids[1]);
		}

		this.isDragging = false;
	}

	stackCards(targetId, dropOnId) {
		const target = this.getCardById(targetId);
		const dropOn = this.getCardById(dropOnId);
		if (!!dropOn.child) return;

		target.setStackId(dropOn.stackId);
		dropOn.setChild(target);

		this.setChildrenPosition(target, dropOn.x, dropOn.y + dropOn.headerHeight);
	}
}

export { Game };
