import "./style.css";
import Card from "./classes/card";
import CardStack from "./classes/card-stack";

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
	currentId: undefined
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
	cards.forEach(card => {
		const matchX = event.offsetX >= card.x && event.offsetX <= card.x + card.width;
		const matchY = event.offsetY >= card.y && event.offsetY <= card.y + card.height;
		// add all id we are curently hovering on
		if (matchX && matchY && !hover.currentId) {
			hover.currentId = card.id;
		} else if (hover.currentId === card.id && !mouse.down) {
			hover.currentId = null;
		}
	});

	// drag card under cuurent mouse pos
	if (mouse.down && hover.currentId) {
		const card = getCardById(hover.currentId);

		card.x = event.x - card.width / 2;
		card.y = event.y - card.headerHeight / 2;
	}
});

//
// MAIN
//

const cardA = new Card(10, 10, "CardA");
const cardB = new Card(250, 10, "CardB");
const cardC = new Card(350, 10, "CardC");

const cardD = new Card(600, 10, "CardD");

const stackA = new CardStack([cardA.id, cardB.id, cardC.id]);
const stackB = new CardStack([cardD.id]);

setTimeout(() => {
	moveToStack(cardB.id);
}, 1000);

setTimeout(() => {
	moveToStack(cardC.id, stackB.id);
}, 2000);

setTimeout(() => {
	moveToStack(cardC.id);
}, 3000);

const cards: Card[] = [cardA, cardB, cardC, cardD];
const cardStack = [stackA, stackB];

//
// cards
//

function getCardById(id: string) {
	return cards.find(c => c.id === id);
}

//
// cardstack
//

function getStackById(stackId: string) {
	return cardStack.find(s => s.id === stackId);
}

function findMatchedStack(cardId: string): { stack: CardStack; index: number } | null {
	let matchIndex = -1;
	const matchedStack = cardStack.find(stack => {
		return stack.cards.find((id, i) => {
			if (cardId === id) {
				matchIndex = i;
				return true;
			}
			return false;
		});
	});
	if (matchedStack) {
		return {
			stack: matchedStack,
			index: matchIndex
		};
	}
	return null;
}
/**
 * Moves a card to a Stack when defined or creates a new stack
 * @param cardId Id of the Card
 * @param stackId Id of the taget Stack
 * @returns
 */
function moveToStack(cardId: string, stackId?: string) {
	// find card stack

	const match = findMatchedStack(cardId);

	// exit when no match
	if (!match) return;

	const cards = match.stack.cards.slice(match.index);

	if (stackId) {
		// move to stack if it exists
		const stack = getStackById(stackId);
		stack.pushMany(cards);
	} else {
		// move card and children to new stack
		const stack = new CardStack(cards);

		const rootCard = stack.getRootCard();
		const matchedStackRootCard = match.stack.getRootCard();
		rootCard.y = matchedStackRootCard.y;
		rootCard.x = matchedStackRootCard.x + 300;
		cardStack.push(stack);
	}

	// remove card and children from old stack
	match.stack.cards.splice(match.index);
}

function animate() {
	requestAnimationFrame(animate);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	cardStack.forEach(stack => {
		const stackRootCard = getCardById(stack.cards[0]);

		stack.cards.forEach((cardId, i) => {
			const card = getCardById(cardId);
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

export { getCardById };
