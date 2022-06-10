import "./style.css";
import Card from "./classes/card";
import DragCardManager from "./logic/drag-card-manager";
import CraftableCardStack from "./classes/craftable-card-stack";
import Recipe from "./classes/recipe";

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

let stackA = new CraftableCardStack();
stackA.insertAtBeginning(Card.fromType("villager"));
stackA.setPosition(100, 100);

let stackB = new CraftableCardStack();
stackB.insertAtBeginning(Card.fromType("tree"));
stackB.setPosition(300, 100);

let stackC = new CraftableCardStack();
stackC.insertAtBeginning(Card.fromType("tree"));
stackC.setPosition(500, 100);

const cardStacks: CraftableCardStack[] = [stackA, stackB, stackC];

new DragCardManager(canvas, cardStacks, drawGame);

export function drawGame() {
	ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

	cardStacks.forEach(stack => {
		stack.draw(ctx);
	});
}

export function addCardStack(recipe: Recipe) {
	if (!recipe) return;
	let stack = new CraftableCardStack();
	stack.insertAtBeginning(Card.fromType(recipe.produces.id));
	stack.setPosition(500, 100);

	cardStacks.push(stack);
}

drawGame();
