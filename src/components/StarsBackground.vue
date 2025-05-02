<script setup lang="ts">
import { MyLevel } from '@/engine/level';
import { Color, DisplayMode, Engine } from 'excalibur';
import { onMounted, onUnmounted, ref } from 'vue';

const game = ref<Engine | null>(null)

onUnmounted(() => {
  game.value?.stop();
  game.value = null;
})

onMounted(() => {
  game.value = new Engine({
    backgroundColor: Color.Black,
    canvasElementId: 'stars-canvas', // The id of the canvas element to use
    displayMode: DisplayMode.FillScreen, // Display mode tells excalibur how to fill the window
    scenes: {
      start: MyLevel,
    },
    physics: {
      enabled: false,
    },
  });
  game.value.start("start")
})
</script>

<template>
  <div id="stars">
    <canvas id="stars-canvas" class="absolute" />
  </div>
</template>
