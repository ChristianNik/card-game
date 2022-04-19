
<script setup>
import { onMounted } from "vue";
import { Game } from "../logic/game";
import { GameObject } from "../logic/game-object";
import { CardObject } from "../logic/card-object";

const game = new Game();

onMounted(() => {
  game.init("myCanvas");
  game.addCard(new CardObject(10, 10, { title: "Card 1" }), "A");
  game.addCard(new CardObject(10, 10, { title: "Card 2" }), "A");
  game.addCard(new CardObject(10, 10, { title: "Card 3" }), "A");
  game.addCard(new CardObject(10, 10, { title: "Card 4" }), "A");

  game.addCard(new CardObject(300, 10, { title: "Card 5" }), "B");
  game.addCard(new CardObject(300, 10, { title: "Card 6" }), "B");

  game.renderCards();
});

function handleAddCard() {
  game.addGameObject(new CardObject(500, 100, { title: "Card 2" }));
}
</script>

<template>
  <button @click="game.handleStack">Stack</button>
  <button @click="handleAddCard">Add Card</button>
  <canvas
    id="myCanvas"
    @click="game.handleClick"
    @mousemove="game.handleMouseMove"
    @mousedown="game.handleMouseDown"
    @mouseup="game.handleMouseUp"
  ></canvas>
</template>