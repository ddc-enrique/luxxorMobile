import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState={
    shopCart:[],
    subtotal:0,
    total:0,
}

const storeData = async (title, value) => {
    try {
      await AsyncStorage.setItem(title, value)
    } catch (e) {
      console.log(e)
    }
  }

const shopCartReducer=  (state=initialState ,action)=>{
    switch(action.type){
        case 'ADD':
        let productFound = state.shopCart.find((item) => item.productId === action.payload.id);
            let aux_shopCart_add=state.shopCart.map(item=>
                item.productId===action.payload.id
                    ?{productId:item.productId,quantity: item.quantity + 1,name:action.payload.name,productPrice:action.payload.price}
                    :item    
            )
            let aux_shopCart_add_2=[...state.shopCart,{productId:action.payload.id,quantity:1,name:action.payload.name,productPrice:action.payload.price}]
            let subtotal_add=parseFloat((state.subtotal+(action.payload.price)).toFixed(2))
            let total_add=parseFloat((state.total+((action.payload.price)*(100-action.payload.discount)/100)).toFixed(2))

            // AsyncStorage.setItem('subtotal',JSON.stringify(subtotal_add))
            //  AsyncStorage.setItem('total',JSON.stringify(total_add))
            storeData('subtotal',JSON.stringify(subtotal_add))
            storeData('total',JSON.stringify(total_add))
            console.log(productFound)

            if(productFound){
                // AsyncStorage.setItem('shopCart',JSON.stringify(aux_shopCart_add))
                storeData('shopCart',JSON.stringify(aux_shopCart_add))
                return{
                    ...state,
                    shopCart:aux_shopCart_add,
                    subtotal:subtotal_add,
                    total:total_add
                }
            }else{
                // AsyncStorage.setItem('shopCart',JSON.stringify(aux_shopCart_add_2))
                storeData('shopCart',JSON.stringify(aux_shopCart_add_2))
                return{
                    ...state,
                    shopCart:aux_shopCart_add_2,
                    subtotal:subtotal_add,
                    total:total_add
                }
            }

            case'DELETE':
            let productToDelete=state.shopCart.find(item=>item.productId===action.payload.id)
                let aux_shopCart_delete=state.shopCart.map(item=>
                    item.productId===action.payload.id
                    ?{...item,quantity:item.quantity-1}
                    :item
                )
                let aux_shopCart_delete_2=state.shopCart.filter(item=>item.productId!==action.payload.id)
                let subtotal_delete=parseFloat((state.subtotal-(action.payload.price)).toFixed(2))
                let total_delete= parseFloat((state.total-((action.payload.price)*(100-action.payload.discount)/100)).toFixed(2))

                AsyncStorage.setItem('subtotal',JSON.stringify(subtotal_delete))
                AsyncStorage.setItem('total',JSON.stringify(total_delete))     
                 
                if(productToDelete.quantity > 1){
                    AsyncStorage.setItem('shopCart',JSON.stringify(aux_shopCart_delete))
                    return{
                        ...state,
                        shopCart:aux_shopCart_delete,
                        subtotal:state.subtotal-(action.payload.price),
                        total:parseFloat((state.total-((action.payload.price)*(100-action.payload.discount)/100)).toFixed(2))
                    }
                }else{
                    AsyncStorage.setItem('shopCart',JSON.stringify(aux_shopCart_delete_2))
                    return{
                        ...state,
                        shopCart:aux_shopCart_delete_2, 
                        subtotal:state.subtotal-(action.payload.price),
                        total:parseFloat((state.total-((action.payload.price)*(100-action.payload.discount)/100)).toFixed(2))
                    }
                }

            case 'DELETE_ALL_QUANTITY': {
                let aux_shopCart=state.shopCart.filter(item=>item.productId!==action.payload.id)
                let subtotal_delete_quantity=parseFloat((state.subtotal-(action.payload.price*action.payload.quantity)).toFixed(2))
                let total_delete_quantity=parseFloat((state.total-((action.payload.price*action.payload.quantity)*(100-action.payload.discount)/100)).toFixed(2))

                AsyncStorage.setItem('shopCart',JSON.stringify(aux_shopCart))
                AsyncStorage.setItem('subtotal',JSON.stringify( subtotal_delete_quantity))
                AsyncStorage.setItem('total',JSON.stringify(total_delete_quantity ))    

                return {
                    ...state,
                    shopCart: aux_shopCart,
                    subtotal:subtotal_delete_quantity,
                    total:total_delete_quantity
                }   
            }
            case 'RESET_CART':{
                AsyncStorage.removeItem('shopCart')
                AsyncStorage.removeItem('subtotal')
                AsyncStorage.removeItem('total')
                return {
                    ...state,
                    shopCart:[],
                    subtotal:0,
                    total:0,                    
                }
            }    
            case 'LOAD_LS':{
                
                return {
                    ...state,
                    //  shopCart:JSON.parse(action.payload.shopCart),
                    //  subtotal:JSON.parse(action.payload.subtotal),
                    //  total:JSON.parse(action.payload.total),  
                    shopCart:action.payload.shopCart,
                     subtotal:action.payload.subtotal,
                     total:action.payload.total,                    
                }
            }
        default:
            return state
    }
}
export default shopCartReducer