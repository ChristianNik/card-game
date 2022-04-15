<script setup>
import Card from "./Card.vue";

const emit = defineEmits(["dragstart", "drop"]);

defineProps({
  cards: Array,
  id: String,
});

const startDrag = (event, _id) => {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("cardID", _id);
  emit("dragstart", _id);
};

const onDrop = (event, dropId) => {
  const targetId = event.dataTransfer.getData("cardID");
  console.log(targetId, "->", dropId);

  if (dropId === targetId) return;

  emit("change", { current: targetId, target: dropId });
};
</script>

<template>
  <div class="card-stack flex flex-col">
    <card
      :title="`Default ${card._id}`"
      v-for="(card, index) in cards"
      :key="card._id"
      :id="card._id"
      :children="card.children"
      :collapsed="index !== cards.length - 1"
      @dragstart="startDrag($event, id)"
      @drop="onDrop($event, id)"
    >
    </card>
  </div>
</template>


<style >
.card-stack .card:not(:first-child) header {
  /* display: none; */
  border-top: 0;
  border-radius: 0;
}
</style>