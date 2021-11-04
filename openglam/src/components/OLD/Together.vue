<script setup lang="ts">
import { viewStateType } from '@/shared'
import { DECKGL_SETTINGS, MAPBOX_SETTINGS } from '@/utils/defaultSettings'
import { Deck } from '@deck.gl/core'
import mapboxgl, { accessToken } from 'mapbox-gl'
import { onMounted, reactive } from 'vue'

interface Props {
  accessToken: string
}

const props = defineProps<{
  accessToken: string
}>()

let map: any = null
let deck: any = null
const token = accessToken
const viewState = reactive({
  latitude: 36.102376,
  longitude: -80.649277,
  zoom: 4,
  pitch: 0,
  bearing: 0,
})

onMounted(() => {
  mapboxgl.accessToken = props.accessToken
  map = new mapboxgl.Map({
    ...MAPBOX_SETTINGS,
  })
  deck = new Deck({
    ...DECKGL_SETTINGS,
    onViewStateChange: ({ viewState }) => handleMapChange(viewState),
    onClick: (event, info) => console.log('clicked map', { event, info }),
  })
})

function handleMapChange(viewState: viewStateType) {
  map.jumpTo({
    center: [viewState.longitude, viewState.latitude],
    zoom: viewState.zoom,
    bearing: viewState.bearing,
    pitch: viewState.pitch,
  })
}
</script>

<template>
  <div class="relative h-screen">
    <div class="deck-container">
      <div id="map" ref="map"></div>
      <canvas id="deck-canvas" ref="canvas"></canvas>
    </div>
  </div>
</template>

<style scoped>
.deck-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
.deck-container #map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #e5e9ec;
  overflow: hidden;
}
.deck-container #deck-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
