import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

export default function useMedia(query: string, defaultState = false): Ref<boolean> {
  let mql: MediaQueryList
  const matches = ref(defaultState)
  const updateMatches = () => {
    if (mql) matches.value = mql.matches
  }

  onMounted(() => {
    mql = window.matchMedia(query)

    mql.addEventListener('onload', updateMatches)
    matches.value = mql.matches
  })

  onUnmounted(() => {
    mql.removeEventListener('onload', updateMatches)
  })

  return matches
}
