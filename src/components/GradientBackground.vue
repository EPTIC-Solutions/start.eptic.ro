<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import StarsBackground from './StarsBackground.vue'

const getTime = () => {
  return new Date()
}

const time = ref(getTime())

const nextUpdateDate = computed(() => {
  const nextUpdateDate = new Date()

  nextUpdateDate.setHours(time.value.getHours() + 1, 0, 0, 0)

  return nextUpdateDate
})

const STARS_COUNT = {
  22: 1000 + Math.random() * 500, // 1000-1500 stars at 22:00
  23: 2000 + Math.random() * 1000, // 2000-3000 stars at 23:00
  0: 5000 + Math.random() * 5000, // 5000-10_000 stars at 00:00
  1: 5000 + Math.random() * 10000, // 5000-15_000 stars at 01:00
  2: 5000 + Math.random() * 5000, // 5000-10_000 stars at 02:00
  3: 5000 + Math.random() * 5000, // 5000-10_000 stars at 03:00
  4: 2000 + Math.random() * 1000, // 2000-3000 stars at 04:00
  5: 1000 + Math.random() * 500 // 1000-1500 stars at 05:00
}

const starsCount = computed<number>(() => {
  // @ts-ignore
  return STARS_COUNT[time.value.getHours()]
})

const timeout = ref<ReturnType<typeof setTimeout> | undefined>(undefined)

watch(
  nextUpdateDate,
  () => {
    timeout.value = setTimeout(() => {
      time.value = getTime()
    }, nextUpdateDate.value.getTime() - time.value.getTime())
  },
  { immediate: true }
)

onUnmounted(() => {
  timeout.value && clearTimeout(timeout.value)
})
</script>

<template>
  <div className="z-0">
    <div :class="`hour-${time.getHours()} absolute inset-0`" />
    <template v-if="time.getHours() >= 22 || time.getHours() <= 5">
      <StarsBackground :stars="starsCount" />
    </template>
  </div>
</template>

<style scoped>
.hour-0 {
  background: #00000c;
}

.hour-1 {
  background: linear-gradient(to bottom, #020111 85%, #191621 100%);
}

.hour-2 {
  background: linear-gradient(to bottom, #020111 60%, #20202c 100%);
}

.hour-3 {
  background: linear-gradient(to bottom, #020111 10%, #3a3a52 100%);
}

.hour-4 {
  background: linear-gradient(to bottom, #20202c 0%, #515175 100%);
}

.hour-5 {
  background: linear-gradient(to bottom, #40405c 0%, #6f71aa 80%, #8a76ab 100%);
}

.hour-6 {
  background: linear-gradient(to bottom, #4a4969 0%, #7072ab 50%, #cd82a0 100%);
}

.hour-7 {
  background: linear-gradient(to bottom, #757abf 0%, #8583be 60%, #eab0d1 100%);
}

.hour-8 {
  background: linear-gradient(to bottom, #82addb 0%, #ebb2b1 100%);
}

.hour-9 {
  background: linear-gradient(to bottom, #94c5f8 1%, #a6e6ff 70%, #b1b5ea 100%);
}

.hour-10 {
  background: linear-gradient(to bottom, #b7eaff 0%, #94dfff 100%);
}

.hour-11 {
  background: linear-gradient(to bottom, #9be2fe 0%, #67d1fb 100%);
}

.hour-12 {
  background: linear-gradient(to bottom, #90dffe 0%, #38a3d1 100%);
}

.hour-13 {
  background: linear-gradient(to bottom, #57c1eb 0%, #246fa8 100%);
}

.hour-14 {
  background: linear-gradient(to bottom, #2d91c2 0%, #1e528e 100%);
}

.hour-15 {
  background: linear-gradient(to bottom, #2473ab 0%, #1e528e 70%, #5b7983 100%);
}

.hour-16 {
  background: linear-gradient(to bottom, #1e528e 0%, #265889 50%, #9da671 100%);
}

.hour-17 {
  background: linear-gradient(to bottom, #1e528e 0%, #728a7c 50%, #e9ce5d 100%);
}

.hour-18 {
  background: linear-gradient(to bottom, #154277 0%, #576e71 30%, #e1c45e 70%, #b26339 100%);
}

.hour-19 {
  background: linear-gradient(to bottom,
      #163c52 0%,
      #4f4f47 30%,
      #c5752d 60%,
      #b7490f 80%,
      #2f1107 100%);
}

.hour-20 {
  background: linear-gradient(to bottom, #071b26 0%, #071b26 30%, #8a3b12 80%, #240e03 100%);
}

.hour-21 {
  background: linear-gradient(to bottom, #010a10 30%, #59230b 80%, #2f1107 100%);
}

.hour-22 {
  background: linear-gradient(to bottom, #090401 50%, #4b1d06 100%);
}

.hour-23 {
  background: linear-gradient(to bottom, #00000c 80%, #150800 100%);
}
</style>
