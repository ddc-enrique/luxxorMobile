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

const Payment = (props) => {
    const chooseCash = () => {
        props.setPayment("Efectivo")       
        props.setScreen(3)
    }
        return(
            <>
             <View style={styles.container}>
                        {/*<View  style={styles.boxPayment}> 
                            <Image style={styles.imgMethod} source={{uri: "https://i.postimg.cc/qv5jY1sf/moneyy.png"}}/>
                        </View>
                        <Text>AHAHHAHAHAH</Text> */}
                   <TouchableOpacity style={styles.boxPayment} onPress={chooseCash}>
                        <View style={styles.subContainerTextImg} >
                            <Image style={styles.imgMethod} source={{uri: "https://i.postimg.cc/qv5jY1sf/moneyy.png"}}/>
                            <Text style={{color:"white",fontSize:15}}>Contado Efectivo</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxPayment} onPress={()=>props.setScreen(3)}>
                        <View style={styles.subContainerTextImg}>
                            <Image style={styles.imgMethod} source={{uri: "https://i.postimg.cc/8cNHW9Sv/credit-card-1.png"}}/>
                            <Text style={{color:"white",fontSize:15}}>Paypal</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.boxPayment} onPress={()=>props.setScreen(3)}>
                        <View style={styles.subContainerTextImg}>
                            <Image style={styles.imgMethod} source={{uri: "https://i.postimg.cc/8cNHW9Sv/credit-card-1.png"}}/>
                            <Text style={{color:"white",fontSize:15}}>Tarjetas</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </>
        )

}

const mapStateToProps = (state) => {
    return {

    }
  }
  const mapDispatchToProps ={

  }
export default connect(mapStateToProps, mapDispatchToProps)(Payment)


const styles = StyleSheet.create({
    container:{
        height:"100%",
        alignItems:"center",
        justifyContent:"center"
    },
    boxPayment:{
        width:"84%",
        height:200,
        alignItems:"center",
        justifyContent:"center",
        borderWidth:1.5,
        borderColor:"white",
        borderRadius:10,
        marginBottom:15
    },
    imgMethod:{
        width:100,
        height:100,
    },
    subContainerTextImg:{
        alignItems:"center"
    }

})