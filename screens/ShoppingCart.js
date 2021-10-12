import React, { useState,useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import Header from "../components/Header"
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button"
import { AntDesign } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import shopCartActions from '../redux/actions/shopCartActions'
import productsActions from "../redux/actions/productsActions"
import { connect } from "react-redux"

const ShoppingCart = (props) => {
  const [value, setValue] = useState(0)
  const image = {
    uri: "https://www.filo.news/img/2017/07/02/rocky_balboa2.jpg",
  }
  const [products,setProducts]=useState([])
  const[products2,setProducts2]=useState([])

  const radio_props = [
    { label: "Retiro en local", value: 0 },
    { label: "Envio a domicilio-Entrega a partir de 5 dias hábiles", value: 1 },
  ]

  useEffect(() => {
    props.cartProduct.forEach(item=>{
      props.product(item.productId)
      .then((res)=>{
          aux= {...res.data.response,quantity:item.quantity}
           setProducts2(products2.push(aux))
           setProducts(products2) 
      })
      .catch(e=>console.log(e))
  }) 
    console.log(props.cartProduct)
    console.log(props.total)
    console.log(props.subtotal)
  }, [])

  return (
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
        <Header {...props} />

        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 30, fontWeight: "bold" }}>Carrito de compras</Text>
          <View style={styles.inputsContain}>
            <Text style={styles.textt}>PRODUCTOS</Text>
            <Text style={styles.textt}>SUBTOTAL</Text>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
        <View style={styles.cardProduct}>
            <View style={{ paddingHorizontal: 15, justifyContent: "center" }}>
              <ImageBackground
                source={image}
                resizeMode="cover"
                style={{ width: 80, height: 80 }}
              ></ImageBackground>
            </View>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "column", marginVertical: 5 }}>
                <Text
                  style={{ color: "white", fontSize: 22, marginVertical: 1 }}
                >
                  Netbook 
                </Text>
                <Text
                  style={{ color: "white", fontSize: 18, marginVertical: 1 }}
                >
                  $105{" "}
                </Text>
              </View>
              <View style={styles.sumAndSubtract}>
                <AntDesign name="minuscircleo" size={24} color="rgb(105,105,105)" />
                <Text style={{ color: "white", fontSize: 30, paddingHorizontal: 8 }}>0</Text>
                <AntDesign name="pluscircleo" size={24} color="rgb(105,105,105)" />
              </View>
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text style={{ color: "white", fontSize: 25 }}>$525</Text>
            </View>
            <View style={{ justifyContent: "center" }}>
                <Entypo name="cross" size={40} color="rgb(105,105,105)" />
            </View>
          </View>
          {/* <View style={styles.cardProduct}>
            <View style={{ paddingHorizontal: 15, justifyContent: "center" }}>
              <ImageBackground
                source={image}
                resizeMode="cover"
                style={{ width: 80, height: 80 }}
              ></ImageBackground>
            </View>
            <View style={{ flexDirection: "column" }}>
              <View style={{ flexDirection: "column", marginVertical: 5 }}>
                <Text
                  style={{ color: "white", fontSize: 22, marginVertical: 1 }}
                >
                  Netbook
                </Text>
                <Text
                  style={{ color: "white", fontSize: 18, marginVertical: 1 }}
                >
                  $105{" "}
                </Text>
              </View>
              <View style={styles.sumAndSubtract}>
                <AntDesign name="minuscircleo" size={24} color="rgb(105,105,105)" />
                <Text style={{ color: "white", fontSize: 30, paddingHorizontal: 8 }}>0</Text>
                <AntDesign name="pluscircleo" size={24} color="rgb(105,105,105)" />
              </View>
            </View>
            <View style={{ justifyContent: "center" }}>
              <Text style={{ color: "white", fontSize: 25 }}>$525</Text>
            </View>
            <View style={{ justifyContent: "center" }}>
                <Entypo name="cross" size={40} color="rgb(105,105,105)" />
            </View>
          </View> */}
        </View>

        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <View style={styles.btnAdd}>
            <TouchableOpacity>
              <Text style={{ color: "white", fontSize: 20 }}>
                Agregar mas productos
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <View style={styles.inputsContainSubTotal}>
            <View style={styles.subtext}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
              >
                Subtotal (sin envio):
              </Text>
              <Text style={{ fontSize: 15, color: "white" }}>$975</Text>
            </View>
            <View style={styles.subtext}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
              >
                15%OFF
              </Text>
              <Text style={{ fontSize: 15, color: "white" }}>$42.330</Text>
            </View>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <View style={styles.selectView}>
            <Text style={{ color: "white", fontSize: 18, marginVertical: 8 }}>
              Seleccione una forma de entrega:
            </Text>
            <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={(value) => setValue(value)}
              labelStyle={{ fontSize: 15, color: "white" }}
            />
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <View style={styles.inputsContainTotal}>
            <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
              TOTAL:{" "}
            </Text>
            <Text style={styles.textt}>$894.75</Text>
          </View>
        </View>
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <View style={styles.btnAdd}>
            <TouchableOpacity>
              <Text style={{ color: "white", fontSize: 20 }}>
                Finalizar Compra
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  )
}

const mapStateToProps = (state) => {
  return {
  cartProduct:state.shopCart.shopCart,
  total:state.shopCart.total,
  subtotal:state.shopCart.subtotal
  }
}
const mapDispatchToProps ={
 /*  addProduct:shopCartActions.addToCart, */
  //deleteProduct:shopCartActions.deleteToCart,
  /* resetCart:shopCartActions.resetCart, */
 product:productsActions.product  
}

export default connect(mapStateToProps,mapDispatchToProps)(ShoppingCart)

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // alignItems: "center",
  },
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
    backgroundColor: "rgba(220,220,220,0.5)",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  sumAndSubtract:{
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  }
  //   prueba:{
  //     color:'rgb(220,220,220)'
  //   }
})
