<script setup lang="ts">
import { viewStateInterface } from '@/ts/Interfaces'
import { Deck } from '@deck.gl/core'
import mapboxgl from 'mapbox-gl'
import { onMounted, reactive, watch } from 'vue'

const props = defineProps<{
  layers: Array<any>
}>()
const emit = defineEmits<{
  (e: 'clicked', point: any): void
}>()

const mapStyle = 'mapbox://styles/mapbox/dark-v9'
const viewState: viewStateInterface = reactive({
  latitude: 36,
  longitude: -80,
  zoom: 4,
  pitch: 0,
  bearing: 0,
})

// const mapReference = ref(null)
// const canvasReference = ref(null)
let map: mapboxgl.Map
let deck: Deck

onMounted(() => {
  map = new mapboxgl.Map({
    accessToken:
      'pk.eyJ1IjoibXRyYWxrYSIsImEiOiJja2VjNm5hdWEwNjQ4MnZ0cHlycXlndnN5In0.mfQAFUPzfGZeMht0EToJBA',
    container: 'map',
    interactive: false,
    style: mapStyle,
    center: [viewState.longitude, viewState.latitude],
    zoom: viewState.zoom,
    pitch: viewState.pitch,
    bearing: viewState.bearing,
  })

  deck = new Deck({
    canvas: 'deck-canvas',
    width: '100%',
    height: '100%',
    pickingRadius: 5,
    initialViewState: viewState,
    controller: true,
    onViewStateChange: ({ viewState }: { viewState: viewStateInterface }) => {
      map.jumpTo({
        center: [viewState.longitude, viewState.latitude],
        zoom: viewState.zoom,
        bearing: viewState.bearing,
        pitch: viewState.pitch,
      })
    },
    onClick: (event: any, info: any) => {
      console.log('clicked map', { event, info })
    },
  })
})

watch(
  () => props.layers,
  (newLayers, oldLayers) => {
    if (!deck) {
      return
    }

    deck.setProps({ layers: newLayers })
  }
)
</script>
<template>
  <div class="h-full w-full relative bg-blue-800" bg="blue-800">
    <div class="w-full h-full absolute top-0 left-0">
      <div id="map" ref="map" class="h-full w-full absolute top-0 left-0" />
      <canvas
        id="deck-canvas"
        ref="canvas"
        class="h-full w-full top-0 left-0 absolute"
      />
    </div>
  </div>
</template>
