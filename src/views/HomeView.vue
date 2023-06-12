<script setup lang="ts">
import EnginesList from '@/components/EnginesList.vue'
import GradientBackground from '@/components/GradientBackground.vue'
import InstructionsTooltip from '@/components/InstructionsTooltip.vue'
import SearchBar from '@/components/SearchBar.vue'
</script>

<template>
  <main>
    <GradientBackground />
    <EnginesList />
    <SearchBar />
    <InstructionsTooltip />
  </main>
</template>
