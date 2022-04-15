<script setup>
import { ref } from "vue";
import Card from "./components/Card.vue";
import CardStack from "./components/CardStack.vue";
import {
  stack,
  handleStackChange,
  dropToNewStack,
  craftDone,
} from "./logic/game";
</script>

<template>
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
