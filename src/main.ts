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

window.addEventListener("mousedown", event => {
	mouse.x = event.x;
	mouse.y = event.y;
	mouse.down = true;
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
		const matchX = event.offsetX >= card.x && event.offsetX <= card.x + card.width;
		const matchY = event.offsetY >= card.y && event.offsetY <= card.y + card.height;
		// add all id we are curently hovering on
		if (matchX && matchY) {
			addHoverId(card.id);
		} else {
			if (!(card.id === hover.currentId() && mouse.down)) {
				removeHoverId(card.id);
			}
		}
	});

	// drag card under cuurent mouse pos
	if (mouse.down && hover.currentId()) {
		const card = stackManager.getCardById(hover.currentId());

		if (stackManager.isStackRoot(card.id)) {
			card.x = event.x - card.width / 2;
			card.y = event.y - card.headerHeight / 2;
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
}

//
// MAIN
//

const cardA = new Card(100, 100, { title: "CardA" });
const cardB = new Card(250, 10, { title: "CardB" });
const cardC = new Card(350, 10, { title: "CardC" });
const cardD = Card.fromType("villager", 500, 100);

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

	stackManager.cardStack
		.sort((a, b) => {
			const indexA = stackManager.getCardIndexById(a.cards[0]);
			const indexB = stackManager.getCardIndexById(b.cards[0]);

			return indexA < indexB ? -1 : 1;
		})
		.forEach(stack => {
			const stackRootCard = stackManager.getCardById(stack.cards[0]);

			if (stack.canCraft && stackRootCard) {
				// draw progressbar
				const progressBarOffset = 10;
				const progressBarMaxWidth = stackRootCard.width - progressBarOffset * 2;

				ctx.fillStyle = "#000";
				ctx.fillRect(stackRootCard.x, stackRootCard.y - 45, stackRootCard.width, 40);
				ctx.fillStyle = "#fff";
				ctx.fillRect(
					stackRootCard.x + progressBarOffset,
					stackRootCard.y - 45 + progressBarOffset,
					progressBarMaxWidth * stack.progressBarValue,
					stackRootCard.headerHeight - progressBarOffset * 2
				);
			}

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
