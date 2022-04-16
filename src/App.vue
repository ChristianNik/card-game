<script setup>
import { onMounted, ref } from "vue";
import CardStack from "./components/CardStack.vue";
import {
  stack,
  handleStackChange,
  dropToNewStack,
  craftDone,
} from "./logic/game";
import GameCanvas from "./components/GameCanvas.vue";
</script>

<template>
  <game-canvas />

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
