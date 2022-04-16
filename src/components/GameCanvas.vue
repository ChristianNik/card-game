
<script setup>
import { onMounted } from "vue";
import { CardRender, VillagerCardRender } from "../logic/canvas";

let ctx;
let canvas;

onMounted(() => {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");

  render();
});

function render() {
  ctx.fillStyle = "#AFC5FF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  new CardRender(50, 50).render(ctx, { compact: true });
  new CardRender(50, 90).render(ctx, { compact: false });
  new VillagerCardRender(50 + 200, 50).render(ctx);
}

function click(event) {
  console.log(event);

  render();
}
</script>

<template>
  <canvas
    id="myCanvas"
    width="500"
    height="400"
    style="border: 1px solid #000000"
    @click="click"
  ></canvas>
</template>