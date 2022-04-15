<script setup>
import { ref, watchEffect } from "vue";
import { getCraftable, getRecepieEntity } from "../logic/crafting";
import Card from "./Card.vue";

const emit = defineEmits(["dragstart", "drop", "craftdone"]);

const props = defineProps({
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

watchEffect(() => {
  const ingreds = props.cards.reduce((acc, card) => {
    if (acc[card.type] == null) {
      acc[card.type] = 0;
    }
    acc[card.type] = acc[card.type] + 1;
    return acc;
  }, {});

  const craftable = getCraftable(ingreds);
  if (!craftable) return;

  craftRecepie.value = getRecepieEntity(craftable);
  cancraft.value = true;
});

const progress = ref(0);
const cancraft = ref(false);
const craftRecepie = ref();
let interval;

watchEffect(() => {
  if (cancraft.value) {
    const increment = () => {
      progress.value = progress.value + 1;
    };

    interval = setInterval(
      increment,
      (craftRecepie.value.recepie.duration * 1000) / 100
    );
  }
});
watchEffect(() => {
  if (progress.value === 100) {
    clearInterval(interval);

    cancraft.value = false;
    progress.value = 0;
    emit("craftdone", { current: props.id, type: craftRecepie.value.id });
  }
});
</script>

<template>
  <div>
    <div
      v-if="cancraft"
      class="h-8 p-2 mb-2 rounded"
      style="background-color: #43423d"
    >
      <div
        class="h-4 w-10 bg-white rounded-sm"
        :style="`width: ${progress}%`"
      />
    </div>
    <div class="card-stack flex flex-col">
      <card
        :title="`Default ${card._id}`"
        v-for="(card, index) in cards"
        :key="card._id"
        :id="card._id"
        :type="card.type"
        :collapsed="index !== cards.length - 1"
        @dragstart="startDrag($event, id)"
        @drop="onDrop($event, id)"
      >
      </card>
    </div>
  </div>
</template>


<style >
.card-stack .card:not(:first-child) header {
  border-top: 0;
  border-radius: 0;
}
</style>