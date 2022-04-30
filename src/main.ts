import "./style.css";
import Card from "./classes/card";
import CardStackManager from "./classes/card-stack-manager";
import UIManager from "./classes/ui-manager";

const bgcanvas: any = document.querySelector("#bg-layer");
const bgctx: CanvasRenderingContext2D = bgcanvas.getContext("2d");

bgcanvas.width = innerWidth;
bgcanvas.height = innerHeight;

bgctx.fillStyle = "#A7F3D0";
bgctx.fillRect(0, 0, bgcanvas.width, bgcanvas.height);

const canvas: any = document.querySelector("#game-layer");
const ctx: CanvasRenderingContext2D = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

//
// HOVER
//

let hover = {
	prevId: undefined,
	stack: new Set<string>(),
	currentId: () => [...hover.stack][0]
};

let mouse = {
	x: undefined,
	y: undefined,
	down: false
};

let shiftX = 0;
let shiftY = 0;

window.addEventListener("mousedown", event => {
	mouse.x = event.x;
	mouse.y = event.y;
	mouse.down = true;

	const card = stackManager.getCardById(hover.currentId());
	if (!card) return;

	shiftX = event.clientX - card.x;
	shiftY = event.clientY - card.y;
});

window.addEventListener("mouseup", event => {
	mouse.x = event.x;
	mouse.y = event.y;
	mouse.down = false;

	if (!(hover.stack.size > 1)) return;

	const targetCardId = [...hover.stack][1];
	const match = stackManager.findMatchedStack(targetCardId);
	if (!match) return;
	stackManager.moveToStack(hover.currentId(), match.stack.id);
	stackManager.clearStacks();
});

window.addEventListener("mousemove", event => {
	mouse.x = event.x;
	mouse.y = event.y;
	stackManager.cards.forEach(card => {
		// add all id we are curently hovering on
		if (
			event.offsetX > card.x + card.width ||
			event.offsetX < card.x ||
			event.offsetY > card.y + card.height ||
			event.offsetY < card.y
		) {
			// no collision
			if (!(card.id === hover.currentId() && mouse.down)) {
				removeHoverId(card.id);
			}
		} else {
			// collision with mouse
			addHoverId(card.id);
		}
	});

	// drag card under cuurent mouse pos
	if (mouse.down && hover.currentId()) {
		const card = stackManager.getCardById(hover.currentId());

		if (!card) return;

		if (stackManager.isStackRoot(card.id)) {
			card.x = event.x - shiftX;
			card.y = event.y - shiftY;
		} else {
			stackManager.moveToStack(card.id);
		}
	}

	if (mouse.down && hover.currentId() !== hover.prevId) {
		hover.prevId = hover.currentId();

		stackManager.cards = stackManager.cards.sort((a, b) => {
			const currentHoverId = hover.currentId();
			if (a.id === currentHoverId) return 1;
			if (b.id === currentHoverId) return -1;

			return 0;
		});
	}
});

function addHoverId(id) {
	if (hover.stack.has(id)) return;

	hover.stack.add(id);
	const currentHoverId = hover.currentId();

	const sortedStack = [...hover.stack].sort((idA, idB) => {
		const matchA = stackManager.findMatchedStack(idA);
		const matchB = stackManager.findMatchedStack(idB);

		if (mouse.down) {
			return currentHoverId === idA
				? -1
				: currentHoverId === idB
				? 1
				: matchB.index - matchA.index;
		}

		return matchB.index - matchA.index;
	});
	hover.stack = new Set(sortedStack);
}
function removeHoverId(id) {
	if (!hover.stack.has(id)) return;
	hover.stack.delete(id);
	cleanHoverStack();
}

function cleanHoverStack() {
	hover.stack.forEach(id => {
		if (stackManager.getCardById(id)) return;
		hover.stack.delete(id);
	});
}

//
// MAIN
//

const stackManager = new CardStackManager({
	initCardStack: [],
	initCards: []
});

const margin = 250;

stackManager.addCards([Card.fromType("villager", margin * 1, 100)]);
stackManager.addCard(Card.fromType("rock", margin * 2, 100));
stackManager.addCard(Card.fromType("tree", margin * 3, 100));
stackManager.addCard(Card.fromType("wood", margin * 2, 350));
stackManager.addCard(Card.fromType("villager", margin * 1, 600));
stackManager.addCard(Card.fromType("villager", margin * 2, 600));
stackManager.addCard(Card.fromType("mine", margin * 3, 600));

class CameraManager {
	width: number;
	height: number;
	x: number;
	y: number;
	down: boolean = false;
	shiftX: number = 0;
	shiftY: number = 0;
	constructor() {
		addEventListener("mousedown", event => {
			this.x = event.x;
			this.y = event.y;
			this.down = true;

			this.shiftX = event.clientX;
			this.shiftY = event.clientY;
		});

		addEventListener("mouseup", event => {
			this.x = event.x;
			this.y = event.y;
			this.down = false;
		});

		addEventListener("mousemove", event => {
			if (!this.down) return;

			if (hover.stack.size > 0) return;

			stackManager.cards.forEach(card => {
				card.x = card.x + event.x - this.shiftX;
				card.y = card.y + event.y - this.shiftY;
			});
			// TODO: Alternative?: ctx.translate((event.x - this.shiftX) / scale, (event.y - this.shiftY) / scale);

			this.shiftX = event.clientX;
			this.shiftY = event.clientY;
		});
	}
}

const cameraManager = new CameraManager();

const uimanager = new UIManager("#ui-layer");
uimanager.init({ stackManager, hover });

//
//
//

// setInterval(() => {
// 	uimanager.draw();
// }, 1000);

function animate() {
	requestAnimationFrame(animate);

	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	stackManager.cardStack
		.sort((stackA, stackB) => {
			const indexA = stackManager.getCardIndexById(stackA.rootCard?.id);
			const indexB = stackManager.getCardIndexById(stackB.rootCard?.id);

			return indexA < indexB ? -1 : 1;
		})
		.forEach(stack => {
			stack.draw(ctx);
		});
}

animate();
