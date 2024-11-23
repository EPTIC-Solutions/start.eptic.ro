<script setup lang="ts">
import { useEngineStore } from '@/stores/engine'
import isMac from '@/utils/isMac';
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted, ref } from 'vue'

const engineStore = useEngineStore()
const { currentEngine, engines } = storeToRefs(engineStore)

const search = ref('')

const onKeyDown = (event: KeyboardEvent) => {
  if ((isMac() && !event.metaKey) || (!isMac() && !event.ctrlKey)) return
  if (event.key !== 'c') return

  search.value = ''
}

onMounted(() => {
  document.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', onKeyDown)
})
</script>

<template>
  <div id="container">
    <form id="form" @submit="(event) => {
      event.preventDefault()
      engineStore.$doSearch(search)
    }
      ">
      <div id="input">
        <input autofocus="true" type="text" v-model="search" :placeholder="`Search ${engines[currentEngine].name}`"
          autocomplete="off" class="text-4xl sm:text-6xl" />
      </div>
    </form>
  </div>
</template>
