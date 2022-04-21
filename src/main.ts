import "./style.css";
import Card from "./classes/card";
import CardStack from "./classes/card-stack";
import CardStackManager from "./classes/card-stack-manager";

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
	stack: new Set<string>(),
	currentId: () => [...hover.stack][0]
};

let mouse = {
	x: undefined,
	y: undefined,
	down: false
};

window.addEventListener("mousedown", event => {
	mouse.x = event.x;
	mouse.y = event.y;
	mouse.down = true;
});

window.addEventListener("mouseup", event => {
	mouse.x = event.x;
	mouse.y = event.y;
	mouse.down = false;
});

window.addEventListener("mousemove", event => {
	stackManager.cards.forEach(card => {
		const matchX = event.offsetX >= card.x && event.offsetX <= card.x + card.width;
		const matchY = event.offsetY >= card.y && event.offsetY <= card.y + card.height;
		// add all id we are curently hovering on
		if (matchX && matchY && !mouse.down) {
			addHoverId(card.id);
		} else {
			if (!(card.id === hover.currentId() && mouse.down)) {
				removeHoverId(card.id);
			}
		}
	});
	// console.log(hover.stack);

	// drag card under cuurent mouse pos
	if (mouse.down && hover.currentId()) {
		const card = stackManager.getCardById(hover.currentId());

		if (stackManager.isStackRoot(card.id)) {
			card.x = event.x - card.width / 2;
			card.y = event.y - card.headerHeight / 2;
			return;
		}
		stackManager.moveToStack(card.id);
	}
});

function addHoverId(id) {
	if (hover.stack.has(id)) return;

	hover.stack.add(id);
	const sortedStack = [...hover.stack].sort((idA, idB) => {
		const matchA = stackManager.findMatchedStack(idA);
		const matchB = stackManager.findMatchedStack(idB);

		return matchB.index - matchA.index;
	});
	hover.stack = new Set(sortedStack);
}
function removeHoverId(id) {
	if (!hover.stack.has(id)) return;
	hover.stack.delete(id);
}

//
// MAIN
//

const cardA = new Card(10, 10, "CardA");
const cardB = new Card(250, 10, "CardB");
const cardC = new Card(350, 10, "CardC");
const cardD = new Card(600, 10, "CardD");

const stackA = new CardStack([cardA.id, cardB.id, cardC.id]);
const stackB = new CardStack([cardD.id]);

const stackManager = new CardStackManager({
	initCardStack: [stackA, stackB],
	initCards: [cardA, cardB, cardC, cardD]
});

// setTimeout(() => {
// 	stackManager.moveToStack(cardB.id);
// }, 100);

// setTimeout(() => {
// 	stackManager.moveToStack(cardC.id, stackB.id);
// }, 200);

// setTimeout(() => {
// 	stackManager.moveToStack(cardC.id);
// }, 300);

//
//
//

function animate() {
	requestAnimationFrame(animate);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	stackManager.cardStack.forEach(stack => {
		const stackRootCard = stackManager.getCardById(stack.cards[0]);

		stack.cards.forEach((cardId, i) => {
			const card = stackManager.getCardById(cardId);
			if (!card) throw new Error(`Card with id '${cardId}' not found.`);

			const isRoot = i === 0;

			if (!isRoot) {
				card.x = stackRootCard.x;
				card.y = stackRootCard.y + 40 * i;
			}

			ctx.save();
			card.update(ctx);
			ctx.restore();
		});
	});
}

animate();

export {};
