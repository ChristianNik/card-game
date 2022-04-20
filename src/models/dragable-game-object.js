import { GameObject } from "../logic/game-object";

class DragableGameObject extends GameObject {
	constructor() {
		super(100, 50);
	}

	handleDragging(event) {
		this.x = event.offsetX;
		this.y = event.offsetY;
	}
}

export { DragableGameObject };
