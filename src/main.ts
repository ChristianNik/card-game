import "./style.css";
import Card from "./classes/card";
import DragCardManager from "./logic/drag-card-manager";

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

const cards = [Card.fromType("villager", 100, 100), Card.fromType("villager", 300, 100)];

function draw() {
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	cards.forEach(card => {
		ctx.save();
		card.draw(ctx);
		ctx.restore();
	});
}

new DragCardManager(canvas, cards, draw);

draw();
