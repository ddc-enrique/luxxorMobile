import React,{useState} from 'react'
import { StyleSheet, Text, View,ImageBackground,TouchableOpacity,Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { connect } from "react-redux"
import shopCartActions from '../redux/actions/shopCartActions'
import { showMessage, hideMessage } from "react-native-flash-message"

const CardScProduct = (props) => {
    const {product}=props
    const[counter,setCounter]=useState(product.quantity)
    const [visible,setVisible]= useState(true)
    const image = { uri: `https://luxxor.herokuapp.com/productsPhoto/${product.photos[0]}` }

    const addProductHandler=()=>{
        if(counter<product.stock){
            props.addProduct(product._id,product.price,product.discount)
            setCounter(counter+1)
        }else{
            showMessage({
                message: "No hay mas unidades ! ",
                type: "warning",
                backgroundColor: "#00bb2d",
              })
        }
    }
    const deleteProductHandler=()=>{
        if(counter>1){
            props.deleteProduct(product._id,false,product.price,counter,product.discount)
            setCounter(counter-1)
        }
    }

    const deleteProduct=() =>{
         props.deleteProduct(product._id,true,product.price,counter,product.discount)
         showMessage({
            message: "Eliminaste producto ! ",
            type: "success",
            backgroundColor: "#00bb2d",
          })
         setVisible(false)
    } 

    return (
        <>
        {visible&& 
            <View style={styles.cardProduct}>
            <View style={{ alignItems:'flex-end' }}>
                <TouchableOpacity onPress={deleteProduct}>
                    <Entypo name="cross" size={40} color="rgb(105,105,105)" />
                </TouchableOpacity>
            </View>
            <View style={{justifyContent: "center",alignItems: "center"}}>
              <ImageBackground
                source={image}
                resizeMode="cover"
                style={{ width: 110, height: 110 }}
              ></ImageBackground>
            </View>
            <View style={{ flexDirection: "column",alignItems: "center"}}>
              <View style={{ flexDirection: "column", marginVertical: 5 }}>
                <Text
                  style={{ color: "white", fontSize: 28, marginVertical: 3 }}
                >
                 {product.name}
                </Text>
                <Text
                  style={{ color: "white", fontSize: 18, marginVertical: 4,textAlign:'center' }}
                >
                  ${product.price}
                </Text>
              </View>
              <View style={styles.sumAndSubtract}>
                <TouchableOpacity onPress={deleteProductHandler}>
                    <AntDesign name="minuscircleo" size={28} color="rgb(105,105,105)" />
                </TouchableOpacity>
                <Text style={{ color: "white", fontSize: 32, paddingHorizontal: 10 }}>{counter}</Text>
                <TouchableOpacity onPress={addProductHandler}>
                    <AntDesign name="pluscircleo" size={28} color="rgb(105,105,105)" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text style={{ color: "white", fontSize: 30,textAlign:'center' }}>${" "+counter*product.price}</Text>
            </View>
          </View>
        }
        </>
    )
}

const mapDispatchToProps ={
     addProduct:shopCartActions.addToCart,
     resetCart:shopCartActions.resetCart,
     deleteProduct:shopCartActions.deleteToCart
  }

export default connect(null,mapDispatchToProps)(CardScProduct)

const styles = StyleSheet.create({
    inputsContain: {
        marginVertical: 20,
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center",
        borderTopColor: "white",
        borderTopWidth: 1,
        borderBottomColor: "white",
        borderBottomWidth: 1,
        width: "80%",
        paddingVertical: 10,
      },
      inputsContainSubTotal: {
        borderTopColor: "white",
        borderTopWidth: 1,
        borderBottomColor: "white",
        borderBottomWidth: 1,
        width: "80%",
        marginVertical: 15,
      },
      subtext: {
        flexDirection: "row",
        marginVertical: 10,
        color: "white",
        justifyContent: "space-between",
      },
      inputsContainTotal: {
        paddingVertical: 10,
        marginVertical: 20,
        borderTopColor: "white",
        borderTopWidth: 1,
        borderBottomColor: "white",
        borderBottomWidth: 1,
        width: "80%",
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center",
      },
      title: {
        fontSize: 40,
        color: "black",
        backgroundColor: "white",
        padding: 15,
        marginTop: 15,
      },
      textt: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
      },
      btnAdd: {
        borderColor: "white",
        borderWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 40,
      },
      rbStyle: {
        height: 32,
        width: 32,
        borderRadius: 110,
        borderWidth: 2,
        borderColor: "white",
        alignItems: "center",
        justifyContent: "center",
      },
      selectView: {
        marginVertical: 10,
        paddingVertical: 8,
        width: "80%",
      },
      cardProduct: {
        marginVertical: 10,
        paddingVertical: 10,
        width: "95%",
        backgroundColor: "rgba(220,220,220,0.3)",
        flexDirection: "column",
        // justifyContent: "space-around",
        // alignItems: "center",
      },
      sumAndSubtract:{
        flexDirection: "row",
        marginVertical: 5,
        justifyContent: "center",
        alignItems: "center",
      }
})
