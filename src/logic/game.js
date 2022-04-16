import { ref } from "vue";
import { generateId } from "../utils";

class CardModel {
	constructor(type = "default") {
		this._id = generateId();
		this._stackId;
		this.type = type;
	}

	setStackId(id) {
		this._stackId = id;
	}
}

class CardStackModel {
	constructor() {
		this._id = generateId();
		this.cards = [];
	}

	addCard(card) {
		card.setStackId(this._id);
		this.cards.push(card);
		return this;
	}

	pop() {
		return this.cards.pop();
	}

	findById(id) {
		return this.cards.find(c => c._id === id);
	}

	destroy() {
		this.cards = this.cards.filter(c => c.type === "villager");
		const villagerCount = this.cards.length;
		if (villagerCount > 1) {
			this.cards = this.cards.slice(0, 1);
		}
		return villagerCount - 1;
	}
}

const stack = ref([
	new CardStackModel().addCard(new CardModel("villager")),
	new CardStackModel().addCard(new CardModel("villager")),
	new CardStackModel().addCard(new CardModel("tree")),
	new CardStackModel().addCard(new CardModel("tree")),
	new CardStackModel()
		.addCard(new CardModel("stone"))
		.addCard(new CardModel("stone"))
		.addCard(new CardModel("stone"))
]);

function handleStackChange(event) {
	const current = stack.value.find(stack => stack._id == event.current);
	const target = stack.value.find(stack => stack._id == event.target);

	const card = current.pop();
	if (!card) return;
	target.addCard(card);
}

function dropToNewStack(event) {
	const targetId = event.dataTransfer.getData("cardID");
	const current = stack.value.find(stack => stack._id == targetId);

	const card = current?.pop();

	if (!card) return;
	stack.value = [
		...stack.value.filter(s => s.cards.length > 0),
		new CardStackModel().addCard(card)
	];
}

function craftDone(event) {
	const current = stack.value.find(stack => stack._id == event.current);

	const villagers = [];
	for (let i = 0; i < current.destroy(); i++) {
		villagers.push(new CardStackModel().addCard(new CardModel("villager")));
	}

	stack.value = [
		...stack.value.filter(s => s.cards.length > 0),
		...villagers,
		new CardStackModel().addCard(new CardModel(event.type))
	];
}

export { stack, handleStackChange, dropToNewStack, craftDone };
