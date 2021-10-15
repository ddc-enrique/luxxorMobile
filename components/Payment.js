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
import PaymentWithStripe from "./PaymentWithStripe"
import { StripeProvider } from "@stripe/stripe-react-native"

const Payment = (props) => {
    const [view, setView] = useState(false)
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
                    
                    <TouchableOpacity style={styles.boxPayment} onPress={()=>setView(true)}>
                        
                            
                            <View  style={!view ? styles.subContainerTextImg : styles.none} >
                                <View>
                                    <Image  style={styles.imgMethod} source={{uri: "https://i.postimg.cc/8cNHW9Sv/credit-card-1.png"}}/>
                                    <Text style={{color:"white",fontSize:15, textAlign:"center"}}>Tarjetas</Text>
                                </View>
                            </View>
                            <TouchableOpacity  onPress={()=>setView(false)}>
                                <View style={view ? styles.subContainerTextImg : styles.none} >
                                    <StripeProvider publishableKey="pk_test_51Jj1qDLyz3SCpT0O3dmugpTo4iA2C78CtOPdxQlVspZixLw1sOHMezxnQrmRJCQKUtocOMDMizxW3YraU9Rli0KL00RpThZaav">
                                        <PaymentWithStripe setScreen={props.setScreen} setView={setView} setPayment={props.setPayment}/>
                                        
                                    </StripeProvider>
                                </View>    
                            </TouchableOpacity>
                            
                        
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
    },

    none: {
        display: "none"
    }

})