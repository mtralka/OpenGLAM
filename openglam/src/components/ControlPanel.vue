<script setup lang="ts">
import { useAvailableDataStore } from '@/stores/availableDataStore'
import { useProductStore } from '@/stores/productStore'
import SelectMenu from './SelectMenu.vue'

const availableDataStore = useAvailableDataStore()
const productStore = useProductStore()
productStore.selectedProduct.date = '2021-09-11'

function handleProductSelection(selection) {
  productStore.clickedPoint.show = false
  productStore.selectedProduct.product_id = selection.target.value
}

function handleCropmaskSelection(selection) {
  productStore.selectedProduct.cropmask_id = selection.target.value
}
</script>

<template>
  <div
    class=" max-w-lg bg-white  rounded-3xl "
  >
    <div class="flex flex-col w-full h-full p-10 space-y-4">
      <div class="flex flex-col justify-end space-y-2">
        <p class="text-2xl font-semibold">Product</p>
        <SelectMenu
          :data="availableDataStore.getProducts"
          key-by="product_id"
          label-by="display_name"
          @change="handleProductSelection"
        ></SelectMenu>
      </div>
      <div class="flex flex-col justify-end space-y-2">
        <p class="text-2xl font-semibold">Date</p>
      </div>
      <div class="flex flex-col justify-end space-y-2">
        <p class="text-2xl font-semibold">Cropmask</p>
        <SelectMenu
          :data="availableDataStore.getCropmasks"
          key-by="cropmask_id"
          label-by="display_name"
          placeholder="Select Cropmask"
          @change="handleCropmaskSelection"
        ></SelectMenu>
      </div>
    </div>
  </div>
</template>
