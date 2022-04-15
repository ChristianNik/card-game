<script setup >
import Card from "./Card.vue";
</script>

<template>
  <Card title="Vilager" color="#000" bg1="#FEF9C3" bg2="#FEF08A">
    <template v-slot:right>
      <div
        class="
          absolute
          top-0
          right-0
          bg-black
          w-6
          h-6
          p-5
          flex
          items-center
          justify-center
          rounded-full
        "
        style="color: #fef9c3"
      >
        <span class="font-bold">2</span>
      </div>
    </template>
  </Card>
</template>


<style scoped>
</style>
