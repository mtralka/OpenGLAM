<script setup lang="ts">
import { useProductStore } from '@/stores/productStore'
import { MAP_STYLES } from '@/utils/defaultSettings'
import ControlPanel from './ControlPanel.vue'
import DeckGL from './Map/DeckGL.vue'
import Mapbox from './Map/Mapbox.vue'
import Popup from './Map/Popup.vue'
import TileLayer from './Map/TileLayer.vue'

const accessToken =
  'pk.eyJ1IjoibXRyYWxrYSIsImEiOiJja2VjNm5hdWEwNjQ4MnZ0cHlycXlndnN5In0.mfQAFUPzfGZeMht0EToJBA'

const productStore = useProductStore()



function handleClick(info, event) {
  productStore.clickedPoint.value = null
  productStore.clickedPoint.show = true
  const { object, x, y, coordinate } = info.info
  productStore.loadValueAtPoint(coordinate[0], coordinate[1])
  productStore.clickedPoint.x = x
  productStore.clickedPoint.y = y
}
</script>
<template>
  <div class="w-screen overflow-hidden">
    <div class="absolute z-50 top-10 left-10">
      <p
        class="text-3xl font-bold text-center text-white"
        style="text-shadow: 2px 3px 0 #1db980"
      >
        OpenGLAM
      </p>
    </div>
    <div class="flex flex-col h-screen overflow-y-hidden h-screen">
    <DeckGL @click="handleClick" class="overflow-hidden h-[70vh] md:h-screen flex-shrink"
      ><Mapbox :accessToken="accessToken" :mapStyle="MAP_STYLES.DARK"></Mapbox>
      <TileLayer :data="productStore.getTileLayerURL()"> </TileLayer>
    </DeckGL>
    <ControlPanel class="right-0 bottom-10 md:absolute md:right-10"></ControlPanel>
  </div>
    <Popup></Popup>
  </div>
</template>
