<script setup lang="ts">
import { viewStateType } from '@/shared'
import { MAPBOX_SETTINGS, MAP_STYLES } from '@/utils/defaultSettings'
import mapboxgl from 'mapbox-gl'
import { defineExpose, onMounted, useAttrs } from 'vue'

interface Props {
  accessToken: string
  mapStyle: string
}

const props = defineProps<{
  accessToken: string
  mapStyle?: string
}>()

const attrs = useAttrs()

let map: any

onMounted(() => {
  mapboxgl.accessToken = props.accessToken
  map = new mapboxgl.Map({
    ...MAPBOX_SETTINGS,
    ...attrs,
    style: MAP_STYLES.DARK,
  })
})

function moveMap(viewState: viewStateType): void {
  map.jumpTo({
    center: [viewState.longitude, viewState.latitude],
    zoom: viewState.zoom,
    bearing: viewState.bearing,
    pitch: viewState.pitch,
  })
}

defineExpose({
  moveMap,
})
</script>

<template>
  <div
    id="map"
    class="w-full h-full absolute top-0 left-0"
    ref="baseMapWrapper"
  ></div>
</template>
