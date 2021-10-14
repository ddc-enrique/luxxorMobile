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
                let response = await sendBill(id, total, shopCart, shipping, payment, token)
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
            <View style={styles.box}>
                <Text style={{color:"white",fontSize:20, fontFamily: 'Spartan_700Bold'}}>{confirmedMessage}</Text>
                <Image style={styles.bgContainer} source={{uri: 'https://i.postimg.cc/ZRS7fqNB/fondo-Consola.png'}} />         
            </View>
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
        minHeight:750,
        justifyContent:"center",
        alignItems:"center",
        padding:2
    },
    box:{
        padding:12,
        width:"100%",
        shadowColor: "#000",
		shadowOffset: {
		width: 1,
		height: 5,
		},
		shadowOpacity: 1,
		shadowRadius: 1.41,
		elevation: 1.5,
		borderBottomLeftRadius:  3,
        borderBottomRightRadius:  3,
    },
    bgContainer:{
        width:"100%",
        height:188,
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