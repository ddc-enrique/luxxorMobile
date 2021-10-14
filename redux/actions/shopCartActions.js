 import axios from "axios"

 const shopCartAction={
     addToCart:(id,price,discount,name)=>{
         return(dispatch)=>{
             dispatch({type:'ADD', payload:{id,price,discount,name}})
         }
     },
     deleteToCart:(id,deleteAll,price,quantity,discount)=>{
         return(dispatch)=>{
           deleteAll  
             ? dispatch({type:'DELETE_ALL_QUANTITY', payload:{id,price,quantity,discount}})
             :dispatch({type:'DELETE',payload:{id,price,discount}})            
         }
     },
     resetCart:()=>{
         return (dispatch)=>dispatch({type:'RESET_CART'})
     },
     payCart:(id, amount)=>{
         console.log(id)
         console.log(amount)
         return async (dispatch)=>{
             let response = await axios.post("http://luxxor.herokuapp.com/api/checkout", id, amount)
             console.log(response)
         }
     },
     loadShopInLs:(shopCart,subtotal,total)=>{
         return (dispatch)=>dispatch({type:'LOAD_LS',payload:{shopCart,subtotal,total}})

     }

 }
 export default shopCartAction