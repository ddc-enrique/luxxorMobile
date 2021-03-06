import axios from "axios"

const productsActions = {
    categories: () =>{
        return async (dispatch) =>{
            try {
                let response = await axios.get("http://luxxor.herokuapp.com/api/admin/categories")
                if(!response.data.success) throw new Error(response.data.response)
                dispatch({type: "CATEGORIES", payload: response.data.response})
                return response.data.response
            }catch(e){
                return({success: false, response: e})
            }
        }
    },

    category: (id) =>{
        return async (dispatch) =>{
            try {
                let response = await axios.get(`http://luxxor.herokuapp.com/api/admin/category/${id}`)
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
                let response = await axios.get("http://luxxor.herokuapp.com/api/admin/brands")
                if(response.data.success) {
                    dispatch({type: "BRANDS", payload: response.data.response})
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
                let response = axios.get(`http://luxxor.herokuapp.com/api/admin/brand/${id}`)
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

    productsByUser: (id) => {
        return async (dispatch) => {
            try{
                let response =  await axios.get(`http://luxxor.herokuapp.com/api/user/myshopping/${id}`)
                if (!response.data.success) throw new Error(response.data.response)
                return response.data.response
            }catch(e){
                return ({success: false, response: e.message})
            }
        }
    },



}
export default productsActions