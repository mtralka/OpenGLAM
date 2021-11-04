import { getDatasetEntries } from "@/api/datasets"
import { getValueAtPoint } from "@/api/point"
import { computeTileLayerURL } from '@/api/tile'
import { defineStore } from 'pinia'
export interface productState  {
  selectedProduct: selectedProductType,
  productEntries: Array<any>,
  clickedPoint: clickedPointType
}
export const useProductStore = defineStore('productStore', {
  state: () => ({
    selectedProduct: {},
    productEntries: [],
    clickedPoint: {}
  }) as productState,
  getters: {
    getSelectedProduct(state): selectedProductInterface {
      return state.selectedProduct
    },
    productEntries(state): Array<any> {
      return state.productEntries
    },
    productDate(state): Array<any> {
      return state.productEntries
    },
  },
  actions: {
    async loadProductEntries() {
      const data = await getDatasetEntries(this.selectedProduct)
      this.productEntries = data
    },
    async loadValueAtPoint(x, y) {
      const data = await getValueAtPoint(this.selectedProduct, x, y)
      this.clickedPoint.value = data.value
    },
    getTileLayerURL(){
      console.log(this.selectedProduct)
      return computeTileLayerURL(this.selectedProduct)
    }
  },
})
