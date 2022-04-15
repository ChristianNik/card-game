<script setup>
defineProps({
  title: String,
  color: String,
  bg1: String,
  bg2: String,
});

const startDrag = (event, item) => {
  console.log(event);

  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("itemID", "item.id");
};

const onDrop = (event, item) => {
  const itemID = event.dataTransfer.getData("itemID");
  console.log(itemID);
};
</script>

<template>
  <div
    draggable="true"
    @dragstart="startDrag($event)"
    @drop="onDrop($event)"
    @dragenter.prevent
    @dragover.prevent
    class="card min-h-[16rem] w-52 flex flex-col rounded"
    :style="`background-color: ${bg1 || '#43423D'};color: ${color || '#fff'};`"
  >
    <header
      class="bg-yellow-200 rounded-t border-4 border-black"
      :style="`background-color: ${bg2 || '#61605B'}`"
    >
      <h1 class="p-2 min-h-[35px]">{{ title }}</h1>
    </header>
    <slot>
      <main
        class="
          rounded rounded-t-none
          border-4 border-t-0 border-black
          grow
          flex flex-col
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
    </slot>
  </div>
</template>


<style scoped>
.card > .card header {
  border-top: none;
  border-radius: 0;
  /* empty */
}
</style>