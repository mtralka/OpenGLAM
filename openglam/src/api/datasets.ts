import axios from "@/http-common";
/*
* Retrieves all available datasets
*/
export async function getAvailableProducts() {

    const response = await axios.get("/products", {
        "18n" : "en"
    })
    
    const data = await response.data
    console.log("API", data)
    return data
}

export async function getDatasetEntries() {

    const response = await axios.get("/products", {
        "18n" : "en"
    })
    const data = await response.data

    return data
}