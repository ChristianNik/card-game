<script setup>
import { ref } from "vue";
import Card from "./components/Card.vue";
import VillagerCard from "./components/VillagerCard.vue";

const cards = ref([
  {
    id: "1",
    type: "default",
    children: [],
  },
  {
    id: "2",
    type: "villager",
    children: [],
  },
  {
    id: "3",
    type: "villager",
    children: [],
  },
]);

const startDrag = (event, _id) => {
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("cardID", _id);
};

const onDrop = (event, dropId) => {
  const cardID = event.dataTransfer.getData("cardID");
  console.log(cardID, "->", dropId);

  if (dropId === cardID) return;

  const draggedCard = cards.value.find((card) => {
    return card.id === cardID;
  });

  const card = cards.value.find((card) => {
    return card.id === dropId;
  });

  // add card to new parent
  card.children.push(draggedCard);

  // remove card from parent
  cards.value = cards.value.filter((card) => card.id !== cardID);
};
</script>

<template>
  <div class="flex gap-3 m-3 bg-gray-100 p-6">
    <card
      :title="`Default ${card.id}`"
      v-for="card in cards"
      :key="card.id"
      :id="card.id"
      :children="card.children"
      @dragstart="startDrag($event, card.id)"
      @drop="onDrop($event, card.id)"
    >
      <card
        :title="`Default ${vcard.id}`"
        v-for="vcard in card.children"
        :key="vcard.id"
        :id="vcard.id"
        :children="card.children"
        @dragstart="startDrag($event, card.id)"
        @drop="onDrop($event, card.id)"
      />
    </card>
  </div>
</template>

<style>
</style>
