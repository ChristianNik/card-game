
<script setup>
import { onMounted } from "vue";
import { Game } from "../logic/game";
import { GameObject } from "../logic/game-object";
import { CardObject } from "../logic/card-object";

const game = new Game();

onMounted(() => {
  game.init("game-layer", "bg-layer");
  game.addCard(new CardObject(10, 10, { title: "Card 1" }), "A");
  game.addCard(new CardObject(10, 10, { title: "Card 2" }), "A");
  game.addCard(new CardObject(10, 10, { title: "Card 3" }), "A");
  game.addCard(new CardObject(10, 10, { title: "Card 4" }), "A");

  game.addCard(new CardObject(300, 10, { title: "Card 5" }), "B");
  game.addCard(new CardObject(300, 10, { title: "Card 6" }), "B");

  game.initRender();
});
</script>

<template>
  <div>
    <canvas id="bg-layer"></canvas>

    <canvas
      id="game-layer"
      @click="game.handleClick"
      @mousemove="game.handleMouseMove"
      @mousedown="game.handleMouseDown"
      @mouseup="game.handleMouseUp"
    ></canvas>
  </div>
</template>


<style scoped>
div {
  position: relativ;
}
canvas {
  position: absolute;
  background-color: transparent;
}

#game-layer {
  z-index: 2;
}
#bg-layer {
  z-index: 1;
}
</style>