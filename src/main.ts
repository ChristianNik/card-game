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

const dragManager = new DragCardManager(canvas, cardStacks, draw);

function draw() {
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

	cardStacks.forEach(stack => {
		stack.forEach(node => {
			ctx.save();
			node.data.draw(ctx);
			ctx.restore();
		});
	});
}

draw();
