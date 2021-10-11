import axios from "axios"

const productsActions = {
    categories: () =>{
        return async (dispatch) =>{
            try {
                let response = await axios.get("http://localhost:4000/api/admin/categories")
                if(!response.data.success) throw new Error(response.data.response)
                dispatch({type: "CATEGORIES", payload: response})
                return response.data.response
            }catch(e){
                return({success: false, response: e})
            }
        }
    },

    category: (id) =>{
        return async (dispatch) =>{
            try {
                let response = await axios.get(`http://localhost:4000/api/admin/category/${id}`)
                if (response.data.success) {
                    return response
                }else {
                    return ({success: false})
                }
            }catch(e){
                return({success: false, response: e})
            }
        }
    },

    brands: () => {
        return async (dispatch) =>{
            try {
                let response = await axios.get("http://localhost:4000/api/admin/brands")
                if(response.data.success) {
                    dispatch({type: "BRANDS", payload: response})
                    return response.data.response
                }else {
                    throw new Error(response.data.response)
                }
            }catch(e){
                return({success: false, response: e})
            }
        }
    },

    brand: (id) => {
        return async (dispatch) =>{
            try {
                let response = axios.get(`http://localhost:4000/api/admin/brand/${id}`)
                if (response.data.success) {
                    return response
                }else {
                    return ({success: false})
                }
            }catch(e){
                return({success: false, response: e})
            }
        }
    },

    products: () => {
        return async (dispatch) =>{
            try {
                let response = await axios.get("http://luxxor.herokuapp.com/api/products")
                if (!response.data.success) throw new Error(response.data.response)
                dispatch({type: "PRODUCTS", payload: response.data.response})
                return response.data.response
            }catch(e){
                return({success: false, response: e})
            }
        }
    },

    product: (id) => {
        console.log('entre')
        return async () =>{
            try {
                let response = await axios.get(`http://luxxor.herokuapp.com/api/product/${id}`)
                if (response.data.success) {
                    return response
                }else {
                    return ({success: false})
                }
            }catch(e){
                return ({success: false, response: e})
            }
        }
    },

}
export default productsActions