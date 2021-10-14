import React, { useState, useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  ImageBackground,
  Button,
  Image,
  TouchableOpacity
} from "react-native"
import { showMessage, hideMessage } from "react-native-flash-message";
import { connect } from "react-redux"
import usersAction from '../redux/actions/usersAction'
import shopCartActions from "../redux/actions/shopCartActions"

const ConfirmedSale = ({ id, total, shopCart, token, shipping, payment, sendBill,resetCart}) => {

    const [confirmedMessage, setConfirmedMessage] = useState("Muchas gracias por su compra. En breve recibirás un mail con la información de su orden de compra.")
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const sendNewBill = async () => {
            try {
                let response = await sendBill(id, total, shopCart, true, payment, token)
                if(!response.success) setConfirmedMessage("Algo salio mal, ponganse en contacto luxxor.tech@gmail.com")
               resetCart()
            } catch (error) {
                showMessage({
                    message: error.message,
                    type: "warning",
                    backgroundColor: "rgba(49,25,109,1)",
                  });
            }
        }
        sendNewBill()
        setLoading(false)
    },[])
    if(loading) return <Text>Loading...</Text>
    return(
        <View style={styles.container}>
            <ImageBackground style={styles.bgContainer} source={{uri: 'https://i.postimg.cc/ZRS7fqNB/fondo-Consola.png'}} >
                    <Text style={{color:"white",fontSize:15}}>{confirmedMessage}</Text>
            </ImageBackground>
        </View>
    )

}

const mapDispatchToProps = {
    sendBill: usersAction.sendNewBill,
    resetCart:shopCartActions.resetCart,
}

const mapStateToProps = (state) => {
    return{
        id: state.users.id,
        total: state.shopCart.total,
        shopCart: state.shopCart.shopCart,
        token: state.users.token
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmedSale)


const styles = StyleSheet.create({
    container:{
        width:"100%",
        justifyContent:"center",
        alignItems:"center"

    },
    bgContainer:{
        width:"100%",
        height:250,
    },
    boxPayment:{
        width:200,
        height:200,
        backgroundColor:"red",
    },
    imgMethod:{
        width:20,
        height:20,
    }

})