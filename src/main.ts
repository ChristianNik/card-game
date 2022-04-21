import Card from "./classes/card";
import "./style.css";

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
		if (matchX && matchY) {
			hover.currentId = card.id;
		} else if (hover.currentId === card.id && !mouse.down) {
			hover.currentId = null;
		}
	});

	// drag card under cuurent mouse pos
	if (mouse.down && hover.currentId) {
		const card = getCardById(hover.currentId);

		card.x = event.x;
		card.y = event.y;
	}
});

//
// MAIN
//
const cards: Card[] = [new Card(10, 10), new Card(250, 10)];

function getCardById(id: string) {
	return cards.find(c => c.id === id);
}

function animate() {
	requestAnimationFrame(animate);

	ctx.clearRect(0, 0, canvas.width, canvas.height);

	cards.forEach(card => {
		ctx.save();
		card.update(ctx);
		ctx.restore();
	});
}

animate();
