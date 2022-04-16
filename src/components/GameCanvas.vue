
<script setup>
import { onMounted } from "vue";
import { CardRender, VillagerCardRender } from "../logic/canvas";

let ctx;
let canvas;

const elements = [
  new CardRender(50, 50),
  new CardRender(50, 90),
  new VillagerCardRender(50 + 200, 50),
];

onMounted(() => {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  recizeCanvas();
  render();
});

function render() {
  ctx.fillStyle = "#AFC5FF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  elements.forEach((element) => element.render(ctx));
}

function click(event) {
  console.log(event);

  render();
}

function recizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = 500;
}
</script>

<template>
  <canvas id="myCanvas" @click="click"></canvas>
</template>