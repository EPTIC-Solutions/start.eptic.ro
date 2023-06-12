import { ref } from 'vue'
import { defineStore } from 'pinia'
import GoogleImage from '@/assets/google.png'
import YoutubeImage from '@/assets/youtube.png'

export type Engine = {
  name: string
  src: string
  alt: string
  base: string
  places: {
    name: string
    href: string
  }[]
}

export const useEngineStore = defineStore('engine', () => {
  const engines = ref<Engine[]>([
    {
      name: 'Google',
      src: GoogleImage,
      alt: 'Google Logo',
      base: 'https://google.com/',
      places: [
        {
          name: 'web',
          href: 'https://www.google.com/search?q=%query%'
        }
      ]
    },
    {
      name: 'Youtube',
      src: YoutubeImage,
      alt: 'Youtube Logo',
      base: 'https://youtube.com/',
      places: [
        {
          name: 'search',
          href: 'https://youtube.com/results?search_query=%query%'
        }
      ]
    }
  ])

  const currentEngine = ref(0)

  const $doSearch = (search: string): void => {
    let url = engines.value[currentEngine.value].base
    if (search) {
      url = engines.value[currentEngine.value].places[0].href.replace('%query%', search)
    }
    window.location.href = url
  }
  const $changeEngine = (engine: Engine): void => {
    currentEngine.value = engines.value.findIndex(($engine) => $engine.name === engine.name)
  }

  return {
    engines,
    currentEngine,
    $doSearch,
    $changeEngine
  }
})
