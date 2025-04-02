<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null)

type Star = {
  x: number;
  y: number;
  opacity: number;
  size: number;
  delay: number;
  duration: number;
}

const generateStar = () => new Promise<Star>((resolve) => {
  resolve({
    y: Math.random() * window.innerHeight / window.innerHeight,
    x: Math.random() * window.innerWidth / window.innerWidth,
    opacity: Math.floor(Math.random() * 40 + 40),
    size: Math.random() > 0.2 ? (0.2 + Math.random() * 0.3) : (0.5 + Math.random() * 1.3),
    delay: 100 + Math.random() * 400,
    duration: 0.5 + Math.random() * 9.5,
  })
})

const generateStars = (count: number) => {
  console.time('Calculate star positions')

  for (let i = 0; i < count; i++) {
    generateStar().then(star => generatedStars.value.push(star))
  }

  console.timeEnd('Calculate star positions')
}

const generatedStars = ref<Star[]>([])

function easeInOutSine(x: number): number {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

function fract(x: number): number {
  return x - Math.floor(x);
}

function pingPong(x: number, max: number) {
  return max == 0 ? 0 : Math.abs(fract((x - max) / (max * 2.0)) * max * 2.0 - max);
}

const drawStars = (canvas: HTMLCanvasElement, time: number = 0) => {
  const ctx = canvas.getContext("2d")!
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const timeS = time > 0 ? time / 1000 : 0;

  generatedStars.value.forEach((star) => {
    const ease = time > star.delay ? easeInOutSine(pingPong(timeS, star.duration) / star.duration) : 0;
    const opacity = ease * star.opacity;
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity / 100})`
    ctx.strokeStyle = ctx.fillStyle

    ctx.beginPath()
    ctx.arc(canvas.width * star.x, canvas.height * star.y, star.size, 0, 2 * Math.PI)
    ctx.fill()
    ctx.closePath()

    if (star.size > 0.8) {
      ctx.fillStyle = `rgba(255, 255, 255, ${ease * (star.opacity / 1000 * 0.5)})`
      ctx.strokeStyle = ctx.fillStyle

      ctx.beginPath()
      ctx.arc(canvas.width * star.x, canvas.height * star.y, star.size * 3, 0, 2 * Math.PI)
      ctx.fill()
      ctx.closePath()
    }
  })

  !stopAnimFrame.value && requestAnimationFrame((time) => { drawStars(canvas, time) })
}

const stopAnimFrame = ref(false)

const props = defineProps({
  stars: {
    type: Number,
    required: true
  }
})

const onResize = () => {
  if (canvas.value) {
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
  }
}

onUnmounted(() => {
  stopAnimFrame.value = true;
})

onMounted(() => {
  stopAnimFrame.value = false;
  generateStars(props.stars)
  drawStars(canvas.value!)

  onResize();
  window.addEventListener('resize', onResize)
})
</script>

<template>
  <div id="stars">
    <canvas ref="canvas" class="absolute" />
  </div>
</template>
