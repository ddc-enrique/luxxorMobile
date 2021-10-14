import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from "react-native"
import { connect } from "react-redux"
import {useEffect} from 'react'
import { LinearGradient } from "expo-linear-gradient"
import CheckOutProducts from "../components/CheckOutProducts";
import Payment from "../components/Payment";
import ConfirmedSale from "../components/ConfirmedSale";
import { showMessage, hideMessage } from "react-native-flash-message";

const Checkout = (props) => {
    const [payment,setPayment]= useState(false)
    const[screen,setScreen]=useState(1)
    let componentToRender
    const[shipping,setShipping]=useState(false)

    useEffect(()=>{

        if(!props.token ){
            showMessage({
                message: "Deberas loguearte para finaliza la compra",
                type: "warning",
                backgroundColor: "rgba(49,25,109,1)",
              })
              props.navigation.navigate('Registrarme')
        }
        if(props.token && !props.dni){
            showMessage({
                message: "Completa tu perfil para finalizar la compra",
                type: "warning",
                backgroundColor: "rgba(49,25,109,1)",
              })  
            props.navigation.navigate('MiCuenta')
     
        }

    })


    const changeMenuHandler=()=>{
        if(screen===2){
            setScreen(1)
        }
    }
    switch(screen){
        case 1:
            componentToRender= <CheckOutProducts setScreen={setScreen} propsNavigation={props} setShipping={setShipping}/>
            break
        case 2:
            componentToRender= <Payment setScreen={setScreen} setPayment={setPayment}  /* toast={toast} *//>
            break
        case 3:
            componentToRender= <ConfirmedSale payment={payment} shipping={shipping}/>
            break 
    }
    return(
        <>
            <ScrollView>
                <LinearGradient
                colors={[
                " rgba(47,144,176,1)",
                "rgba(48,106,154,1)",
                "rgba(49,75,136,1)",
                "rgba(49,25,109,1)",
                ]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 1 }}
                style={styles.container}
                >
                    <View style={styles.container}>
                        <View style={styles.navCheck}>
                            <TouchableOpacity style={styles.boxTitle} onPress={changeMenuHandler}>  
                                <View >
                                    <Text style={styles.title}>Paso 1</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style= {styles.boxTitle} >  
                                <View >
                                    <Text style={styles.title} >Paso 2</Text>
                                </View> 
                            </TouchableOpacity>
                            <TouchableOpacity style= {styles.boxTitle}>  
                                <View >
                                    <Text style={styles.title}>Paso 3</Text>
                                </View> 
                            </TouchableOpacity>                              
                        </View>
                        <View>
                            {componentToRender}
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
        </>
    )

}

const mapStateToProps = (state) => {
    return {
        dni: state.users.dni,     
        token:state.users.token, 
    }
}

  export default connect(mapStateToProps)(Checkout)


  const styles = StyleSheet.create({
    container: {
        minHeight:860,
        flex:1,
        padding:20
      },
      navCheck:{
          flexDirection:"row",
          justifyContent:"space-between",
          marginBottom:20
      },
      title:{
        fontSize:20,
        color:"white",
        textAlign:"center"
        
      },
      boxTitle:{
        width:"30%",
        borderBottomWidth:3,
        borderColor:"white"
      }
  })