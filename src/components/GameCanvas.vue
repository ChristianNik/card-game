
<script setup>
import { onMounted } from "vue";
import { Game } from "../logic/game";
import { GameObject } from "../logic/game-object";
import { CardObject } from "../logic/card-object";
import { cardTypes } from "../constants/entities";

const game = new Game();

onMounted(() => {
  game.init("game-layer", "bg-layer");

  // for (let i = 0; i < 5; i++) {
  //   game.addCard(
  //     new CardObject(10, 10 + i * 100, {
  //       title: `Card ${i}`,
  //       type: cardTypes.tree,
  //     })
  //   );
  // }

  game.addCard(CardObject.fromType(10, 50, cardTypes.stick));
  game.addCard(CardObject.fromType(250, 50, cardTypes.villager));

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