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
	stackManager.moveToStack(hover.currentId(), match.stack.id);
});

window.addEventListener("mousemove", event => {
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

window.addEventListener("g_craftingdone", (event: any) => {
	stackManager.addCard(Card.fromType(event.detail.type));

	const stack = stackManager.getStackById(event.detail.stackId);
	const cardsIdsToRemove = stack.getCardsToRemove();

	// remove from hover stack
	cardsIdsToRemove.forEach(cId => hover.stack.delete(cId));
	stackManager.cards = stackManager.cards.filter(card => !cardsIdsToRemove.includes(card.id));
	stack.cards = stack.cards.filter(card => !cardsIdsToRemove.includes(card.id));

	//  move cards to new stack
	stackManager.splitStack(stack.id);

	// remove stacks with no cards
	stackManager.clearCards();
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
}

//
// MAIN
//

const cardA = new Card(100, 100, { title: "CardA" });
const cardB = new Card(250, 10, { title: "CardB" });
const cardC = new Card(350, 10, { title: "CardC" });
const cardD = Card.fromType("villager", 500, 100);
const cardE = Card.fromType("wood", 800, 100);

const stackA = new CardStack([cardA, cardB, cardC]);
const stackB = new CardStack([cardD]);
const stackC = new CardStack([cardE]);

const stackManager = new CardStackManager({
	initCardStack: [stackA, stackB, stackC],
	initCards: [cardA, cardB, cardC, cardD, cardE]
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

	stackManager.cardStack
		.sort((stackA, stackB) => {
			const indexA = stackManager.getCardIndexById(stackA.rootCard?.id);
			const indexB = stackManager.getCardIndexById(stackB.rootCard?.id);

			return indexA < indexB ? -1 : 1;
		})
		.forEach(stack => {
			if (stack.canCraft && stack.rootCard) {
				// draw progressbar
				const progressBarOffset = 10;
				const progressBarMaxWidth = stack.rootCard.width - progressBarOffset * 2;

				ctx.fillStyle = "#000";
				ctx.fillRect(stack.rootCard.x, stack.rootCard.y - 45, stack.rootCard.width, 40);
				ctx.fillStyle = "#fff";
				ctx.fillRect(
					stack.rootCard.x + progressBarOffset,
					stack.rootCard.y - 45 + progressBarOffset,
					progressBarMaxWidth * stack.progressBarValue,
					stack.rootCard.headerHeight - progressBarOffset * 2
				);
			}

			stack.cards.forEach((card, i) => {
				if (!card) throw new Error(`Card with id '${card.id}' not found.`);

				const isRoot = i === 0;

				if (!isRoot) {
					card.x = stack.rootCard.x;
					card.y = stack.rootCard.y + 40 * i;
				}

				ctx.save();
				card.update(ctx);
				ctx.restore();
			});
		});
}

animate();
