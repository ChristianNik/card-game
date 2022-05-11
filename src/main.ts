import "./style.css";
import Card from "./classes/card";
import DragCardManager from "./logic/drag-card-manager";
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
//
//

let stack = new CardStack();

stack.insertAtBeginning(new Card({ x: 100, y: 100, title: "A" }));
stack.insertAtEnd(new Card({ title: "B" }));
stack.insertAtEnd(new Card({ title: "C" }));

stack.getAt(0);

const cardStacks = [stack];

const cards = [];

let node = stack.head;
while (node) {
	cards.push(node.data);
	node = node.next;
}

const dragManager = new DragCardManager(canvas, cards, draw);

function draw() {
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

	cardStacks.forEach(stack => {
		let node = stack.head;
		while (node) {
			ctx.save();
			node.data.draw(ctx);
			ctx.restore();
			node = node.next;
		}
	});

	// cards
	// 	.sort(a => (a.id === dragManager.dragTarget?.id ? 1 : 0))
	// 	.forEach(card => {
	// 		ctx.save();
	// 		card.draw(ctx);
	// 		ctx.restore();
	// 	});
}

draw();
