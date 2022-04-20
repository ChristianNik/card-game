
<script setup>
import { onMounted } from "vue";
import { Game } from "../logic/game";
import { GameObject } from "../logic/game-object";
import { CardObject } from "../logic/card-object";
import { cardTypes } from "../constants/entities";
import { CardStack } from "../models/card-stack";

const game = new Game();

onMounted(() => {
  game.init("game-layer", "bg-layer");

  const stack = new CardStack(100, 100, {
    onCraftDone: (itemId) => {
      game.addCardStack(
        new CardStack(300, 100).push(
          CardObject.fromType(0, 0, cardTypes[itemId])
        )
      );
    },
  });
  game.addCardStack(stack);

  setTimeout(() => {
    stack.push(CardObject.fromType(0, 0, cardTypes.wood));
  }, 100);

  setTimeout(() => {
    stack.push(CardObject.fromType(0, 0, cardTypes.villager));
    stack.craft();
  }, 200);

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