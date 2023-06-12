<script setup lang="ts">
import { onMounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)

const generateStar = () => ({
  y: Math.random() * window.innerHeight,
  x: Math.random() * window.innerWidth,
  opacity: Math.floor(Math.random() * 60 + 5),
  size: Math.random() * 1
})

const generateStars = (count: number) => {
  const stars: ReturnType<typeof generateStar>[] = []

  console.time('Calculate star positions')

  for (let i = 0; i < count; i++) {
    stars.push(generateStar())
  }

  console.timeEnd('Calculate star positions')

  return stars
}

const drawStars = (canvas: HTMLCanvasElement, stars: ReturnType<typeof generateStar>[]) => {
  const ctx = canvas.getContext('2d')!
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  stars.forEach((star) => {
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity / 100})`
    ctx.strokeStyle = ctx.fillStyle

    ctx.beginPath()
    ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()
  })

  console.log(`Stars drawn: ${stars.length}`)
}

const props = defineProps({
  stars: {
    type: Number,
    required: true
  }
})

onMounted(() => {
  drawStars(canvas.value!, generateStars(props.stars))
})
</script>

<template>
  <div id="stars">
    <canvas ref="canvas" class="absolute" />
  </div>
</template>
