<script setup lang="ts">
import Mapbox from '@/components/Map/Mapbox.vue'
import { DECKGL_SETTINGS } from '@/utils/defaultSettings'
import { Deck } from '@deck.gl/core'
import { onMounted, ref, useAttrs, useSlots } from 'vue'
interface Props {
  controlMap?: boolean
}
const accessToken =
  'pk.eyJ1IjoibXRyYWxrYSIsImEiOiJja2VjNm5hdWEwNjQ4MnZ0cHlycXlndnN5In0.mfQAFUPzfGZeMht0EToJBA'
const props = withDefaults(defineProps<Props>(), {
  controlMap: true,
})
const attrs = useAttrs()
const slots = useSlots()

let deck: Deck
const baseMap = ref(null)

onMounted(() => {
  const moveMap = baseMap.value.moveMap
  deck = new Deck({
    ...DECKGL_SETTINGS,
    ...attrs,
    // onAfterRender: setupHandlers,
    onViewStateChange: ({ viewState }: { viewState: viewStateType }) =>
      moveMap(viewState),
  })
})
</script>

<template>
  <div class="h-full w-full relative">
    <!-- <slot ref="baseMapWrapper"></slot> -->
    <Mapbox :accessToken="accessToken" ref="baseMap"> </Mapbox>
    <canvas
      id="deck-canvas"
      class="w-full h-full absolute top-0 left-0"
    ></canvas>
  </div>
</template>
