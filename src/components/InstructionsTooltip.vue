<script setup lang="ts">
import { ref } from 'vue'
import isMac from '@/utils/isMac'

const showTooltip = ref(false)
const firstTimeHere = ref(!localStorage.getItem('firstTimeHere'))

const onMouseEnter = () => {
  if (firstTimeHere.value) {
    firstTimeHere.value = false
    localStorage.setItem('firstTimeHere', 'true')
  }
  showTooltip.value = true
}

const onMouseLeave = () => {
  showTooltip.value = false
}
</script>

<template>
  <div class="absolute z-50 right-5 bottom-5">
    <button
      :class="`${firstTimeHere ? 'animate-bounce' : ''}`"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
      @focus="onMouseEnter"
      @blur="onMouseLeave"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-12 h-12 text-white drop-shadow"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </button>
    <template v-if="showTooltip">
      <div
        class="absolute right-0 p-4 prose origin-bottom-right bg-white rounded-lg shadow-lg bottom-16 w-80"
      >
        <h3>Site Instructions</h3>
        <h4>Shortcuts</h4>
        <ul>
          <li>
            <code>
              <template v-if="isMac()"> ⌘ </template>
              <template v-else> ALT+ </template>[1-9]
            </code>
            to switch between engines
          </li>
          <li>
            <code><template v-if="isMac()"> ⌘ </template> <template v-else> ALT+ </template>C</code>
            to clear the search input
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>
