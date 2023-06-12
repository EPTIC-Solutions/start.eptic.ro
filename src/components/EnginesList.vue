<script setup lang="ts">
import { useEngineStore } from '@/stores/engine'
import { storeToRefs } from 'pinia'

const engineStore = useEngineStore()
const { currentEngine, engines } = storeToRefs(engineStore)
</script>

<template>
  <div
    class="engines flex items-center h-[200px] px-10 snap-x overflow-x-auto justify-start sm:justify-center"
  >
    <img
      v-for="(engine, idx) in engines"
      :src="engine.src"
      :alt="engine.alt"
      :class="`snap-center h-auto ${currentEngine === idx ? 'engineActive' : ''}`"
      @click="engineStore.$changeEngine(engine)"
    />
  </div>
</template>

<style scoped>
.engines .engineActive {
  opacity: 1;
  filter: drop-shadow(2px 2px 0px #bf616a);
}

.engines img {
  filter: drop-shadow(1px 1px 0px #bf616a);
}

.engines img:not(.engineActive) {
  opacity: 0.3;
}

.engines img.engineActive:hover {
  opacity: 1;
}
</style>
