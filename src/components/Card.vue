<script setup>
defineProps({
  title: String,
  color: String,
  bg1: String,
  bg2: String,
});
</script>

<template>
  <div
    class="rounded border-4 border-black h-64 w-52 flex flex-col"
    :style="`background-color: ${bg1 || '#43423D'};color: ${color || '#fff'};`"
  >
    <div
      class="bg-yellow-200 border-b-4 border-black"
      :style="`background-color: ${bg2 || '#61605B'}`"
    >
      <h1 class="p-2 min-h-[35px]">{{ title }}</h1>
    </div>
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
  </div>
</template>


