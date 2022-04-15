<script setup>
import { ref } from "vue";
import Card from "./components/Card.vue";
import CardStack from "./components/CardStack.vue";

const generateId = () => Math.random().toString(16).substr(2, 8);

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
    return this.cards.find((c) => c._id === id);
  }

  destroy() {
    this.cards = this.cards.filter((c) => c.type === "villager");
    return this;
  }
}

const stack = ref([
  new CardStackModel()
    .addCard(new CardModel())
    .addCard(new CardModel())
    .addCard(new CardModel("villager")),
  new CardStackModel().addCard(new CardModel()),
  new CardStackModel().addCard(new CardModel("wood")),
  new CardStackModel().addCard(new CardModel("stone")),
]);

function handleStackChange(event) {
  const current = stack.value.find((stack) => stack._id == event.current);
  const target = stack.value.find((stack) => stack._id == event.target);

  const card = current.pop();
  if (!card) return;
  target.addCard(card);
}

function dropToNewStack(event) {
  const targetId = event.dataTransfer.getData("cardID");
  const current = stack.value.find((stack) => stack._id == targetId);

  const card = current.pop();

  if (!card) return;
  stack.value = [
    ...stack.value.filter((s) => s.cards.length > 0),
    new CardStackModel().addCard(card),
  ];
}

function craftDone(event) {
  const current = stack.value.find((stack) => stack._id == event.current);

  current.destroy();

  stack.value = [
    ...stack.value.filter((s) => s.cards.length > 0),
    new CardStackModel().addCard(new CardModel(event.type)),
  ];
}
</script>

<template>
  <main
    class="bg-emerald-200 p-6 h-screen flex flex-wrap gap-3"
    @dragenter.prevent
    @dragover.prevent
    @drop="dropToNewStack"
  >
    <card-stack
      v-for="group in stack"
      :key="group._id"
      :cards="group?.cards"
      :id="group?._id"
      @change="handleStackChange"
      @craftdone="craftDone"
    />
  </main>
</template>

<style>
</style>
