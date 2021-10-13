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
import {useEffect} from 'react'
import { LinearGradient } from "expo-linear-gradient"
import CardScProduct from "../components/CardScProduct";
const Checkout = (props) => {
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
                            <TouchableOpacity style={styles.boxTitle}>  
                                <View >
                                    <Text style={styles.title}>Paso 1</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style= {styles.boxTitle}>  
                                <View >
                                    <Text style={styles.title}>Paso 2</Text>
                                </View> 
                            </TouchableOpacity>
                            <TouchableOpacity style= {styles.boxTitle}>  
                                <View >
                                    <Text style={styles.title}>Paso 3</Text>
                                </View> 
                            </TouchableOpacity>                              
                        </View>
                        <View>
                        </View>
                    </View>
                </LinearGradient>
            </ScrollView>
        </>
    )

}

const mapStateToProps = (state) => {
    return {

    }
  }
  const mapDispatchToProps ={

  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Checkout)


  const styles = StyleSheet.create({
    container: {
        height:950,
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