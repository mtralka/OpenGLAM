
/**
 *  Describes user selected Product 
 */
<<<<<<< Updated upstream
type selectedProductType {
    product_id: string,
    cropmask_id: string,
=======
type selectedProductType = {
    productID: string,
    cropmaskID: string,
>>>>>>> Stashed changes
    anomaly: AnomolyEnum,
    anomly_type: AnomolyTypeEnum,
    date: Date,
  }

/**
 *Describes DeckGL + MapBox viewState
 */
type viewStateType = {
    latitude: number
    longitude: number
    zoom: number
    pitch: number
    bearing: number
  }


/**
 * Interface for describing possible layers
 */
 export interface layersInterface {
    tileLayer: any,
    adminLayer: any,
  }


  export type clickedPointType {
    show: Boolean,
    value: number,
    x: number,
    y: number


  }