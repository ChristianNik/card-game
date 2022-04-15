<script setup>
import { ref } from "vue";
import CardBase from "./CardBase.vue";
import { cardTypes } from "../constants/card-types";

const props = defineProps({
  color: String,
  bg1: String,
  bg2: String,
  id: String,
  collapsed: Boolean,
  type: String,
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

const args = getCardArgs(props.type);

function getCardArgs(type) {
  if (cardTypes[type]) {
    return cardTypes[type].args;
  }

  return cardTypes["default"].args;
}
</script>

<template>
  <div class="card">
    <card-base
      :title="args.title"
      :bg1="args.bg1"
      :bg2="args.bg2"
      :color="args.color"
      :collapsed="collapsed"
    />
  </div>
</template>