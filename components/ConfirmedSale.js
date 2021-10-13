import React, { useState } from "react"
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
import { connect } from "react-redux"

const ConfirmedSale = (props) => {
        return(
            <View style={styles.container}>
                <ImageBackground style={styles.bgContainer} source={{uri: 'https://i.postimg.cc/ZRS7fqNB/fondo-Consola.png'}} >
                        <Text style={{color:"white",fontSize:15}}>Muchas gracias por su compra. En breve recibirás un mail con la información de su orden de compra.</Text>
                </ImageBackground>
            </View>
        )

}

const mapStateToProps = (state) => {
    return {

    }
  }
  const mapDispatchToProps ={

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