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
import { CardRender, VillagerCardRender } from "./logic/canvas";

onMounted(() => {
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");

  ctx.fillStyle = "#AFC5FF";
  ctx.fillRect(0, 0, c.width, c.height);

  new CardRender(50, 50).render(ctx, { compact: true });
  new CardRender(50, 90).render(ctx, { compact: false });
  new VillagerCardRender(50 + 200, 50).render(ctx);
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
