<script setup>
import { ref } from "vue";

defineProps({
  title: String,
  color: String,
  bg1: String,
  bg2: String,
  id: String,
  collapsed: Boolean,
});

const isDragOver = ref(false);

const dragOver = () => {
  isDragOver.value = true;
};
const drop = () => {
  isDragOver.value = false;
};
const dragLeave = () => {
  isDragOver.value = false;
};
</script>

<template>
  <div
    draggable="true"
    @dragleave="dragLeave"
    @drop="drop"
    class="card w-52 flex flex-col rounded"
    :class="isDragOver && 'ring-8 ring-white'"
    :style="`background-color: ${bg1 || '#43423D'};color: ${color || '#fff'};`"
  >
    <header
      class="bg-yellow-200 rounded-t border-4 border-black"
      :style="`background-color: ${bg2 || '#61605B'}`"
    >
      <h1 class="p-2 min-h-[35px]">{{ title }}</h1>
    </header>

    <main
      v-if="!collapsed"
      @dragover.prevent="dragOver"
      class="
        rounded rounded-t-none
        border-4 border-t-0 border-black
        grow
        flex flex-col
        h-52
      "
    >
      <div class="relative grow">
        <div
          class="
            absolute
            left-1/2
            top-1/2
            transform
            -translate-x-1/2 -translate-y-1/2
            p-16
            rounded-full
          "
          :style="`background-color: ${bg2 || '#61605B'}`"
        />
      </div>
      <div class="flex justify-between p-2 min-h-[48px]">
        <div class="relative grow">
          <slot name="left" />
        </div>
        <div class="relative grow">
          <slot name="right" />
        </div>
      </div>
    </main>
  </div>
</template>


<style scoped>
.card > .card header {
  border-top: none;
  border-radius: 0;
  /* empty */
}
</style>