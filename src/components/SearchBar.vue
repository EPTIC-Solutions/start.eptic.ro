<script setup lang="ts">
import { useEngineStore } from '@/stores/engine'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const engineStore = useEngineStore()
const { currentEngine, engines } = storeToRefs(engineStore)

const search = ref('')
</script>

<template>
  <div id="container">
    <form
      id="form"
      @submit="
        (event) => {
          event.preventDefault()
          engineStore.$doSearch(search)
        }
      "
    >
      <div id="input">
        <input
          autofocus="true"
          type="text"
          v-model="search"
          :placeholder="`Search ${engines[currentEngine].name}`"
          autocomplete="off"
          class="text-4xl sm:text-6xl"
        />
      </div>
    </form>
  </div>
</template>
