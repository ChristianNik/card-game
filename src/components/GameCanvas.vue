
<script setup>
import { onMounted } from "vue";
import { CardRender, VillagerCardRender } from "../logic/canvas";

let ctx;
let canvas;

const elements = [];

onMounted(() => {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  recizeCanvas();

  addCircle(150);
  addCircle(280);

  render();
});

function render() {
  ctx.fillStyle = "#AFC5FF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  elements.forEach((element) => {
    ctx.fillStyle = "red";
    ctx.fill(element.path);
  });
}

function addCircle(x) {
  const circle = new Path2D();
  circle.arc(x, 75, 50, 0, 2 * Math.PI);

  elements.push({
    id: Math.random(),
    path: circle,
  });
}

let hoverElement = null;

function mousemove(event) {
  elements.forEach((element) => {
    if (ctx.isPointInPath(element.path, event.offsetX, event.offsetY)) {
      ctx.fillStyle = "green";
      ctx.fill(element.path);
      hoverElement = element;
    } else {
      ctx.fillStyle = "red";
      ctx.fill(element.path);
      if (hoverElement?.id === element.id) {
        hoverElement = null;
      }
    }
  });
}

function click(event) {
  console.log(hoverElement);
}

function recizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = 500;
}
</script>

<template>
  <canvas id="myCanvas" @mousemove="mousemove" @click="click"></canvas>
</template>