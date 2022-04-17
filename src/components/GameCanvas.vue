
<script setup>
import { onMounted } from "vue";
import { Game } from "../logic/game";
import { GameObject } from "../logic/game-object";
import { CardObject } from "../logic/card-object";

const game = new Game();

onMounted(() => {
  game.init("myCanvas");
  game.addGameObject(new GameObject(5, 5));
  game.addGameObject(new CardObject(100, 100));
  game.addGameObject(new CardObject(500, 100, "Test"));

  game.render();
});
</script>

<template>
  <canvas
    id="myCanvas"
    @click="game.handleClick"
    @mousemove="game.handleMouseMove"
    @mousedown="game.handleMouseDown"
    @mouseup="game.handleMouseUp"
  ></canvas>
</template>