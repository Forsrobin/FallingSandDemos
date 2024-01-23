<script setup lang="ts">
import { onMounted } from 'vue';
import { initEngine } from "@/scripts/engine"

onMounted(() => {
  // code goes here
  initEngine()
});

</script>

<template>
  <canvas id="canvas"></canvas>
</template>

<style scoped>
* {
  min-width: 0px;
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}
</style>
