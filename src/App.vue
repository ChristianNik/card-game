<script setup>
import { onMounted, ref } from "vue";
import Card from "./components/Card.vue";
import CardStack from "./components/CardStack.vue";
import {
  stack,
  handleStackChange,
  dropToNewStack,
  craftDone,
} from "./logic/game";

onMounted(() => {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");

  ctx.fillStyle = "#AFC5FF";
  ctx.fillRect(0, 0, c.width, c.height);

  CanvasRenderingContext2D.prototype.roundRect = function roundRect(
    x,
    y,
    w,
    h,
    r
  ) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
  };

  drawCard(100, 50);
  function drawCard(x, y) {
    const width = 182;
    const height = 227;
    const headerHeight = 40;

    // ground
    ctx.fillStyle = "#FEF9C3";
    ctx.roundRect(x, y, width, height, 5).fill();

    // ground header
    ctx.fillStyle = "#FEF08A";
    ctx.roundRect(x, y, width, headerHeight, 5).fill();

    // ground border
    ctx.lineWidth = 4;
    ctx.roundRect(x, y, width, height, 5).stroke();

    // header border
    ctx.beginPath();
    ctx.moveTo(x, y + headerHeight);
    ctx.lineTo(x + width, y + headerHeight);
    ctx.stroke();

    // title
    ctx.fillStyle = "#000";
    ctx.font = `bold 1.125rem ui-sans-serif, system-ui, Arial`;
    ctx.textBaseline = "middle";

    ctx.fillText("Villager", x + 10, y + 22);
  }
});
</script>

<template>
  <canvas
    id="myCanvas"
    width="500"
    height="400"
    style="border: 1px solid #000000"
  >
  </canvas>
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
