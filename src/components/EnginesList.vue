<script setup lang="ts">
import { useEngineStore, type Engine } from '@/stores/engine'
import isMac from '@/utils/isMac';
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted } from 'vue';

const engineStore = useEngineStore()
const { currentEngine, engines } = storeToRefs(engineStore)

const onKeyDown = (event: KeyboardEvent) => {
  const code = parseInt(event.key)
  if (isNaN(code) || code > engines.value.length || code <= 0) return

  if ((isMac() && !event.metaKey) || (!isMac() && !event.ctrlKey)) return

  event.preventDefault()
  engineStore.$changeEngine(engines.value[code - 1])
}

onMounted(() => {
  document.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeyDown)
})
</script>

<template>
  <div class="engines flex items-center h-[200px] px-10 snap-x overflow-x-auto justify-start sm:justify-center">
    <img v-for="(engine, idx) in engines" v-bind:key="idx" :src="engine.src" :alt="engine.alt"
      :class="`snap-center h-auto ${currentEngine === idx ? 'engineActive' : ''}`"
      @click="engineStore.$changeEngine(engine)" />
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
