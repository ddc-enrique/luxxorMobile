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
import shopCartActions from '../redux/actions/shopCartActions'
import productsActions from "../redux/actions/productsActions"
import { connect } from "react-redux"
import CardScProduct from '../components/CardScProduct'
import { showMessage} from "react-native-flash-message"

const ShoppingCart = (props) => {
  const [value, setValue] = useState(0)
  const [products,setProducts]=useState([])
  const[products2,setProducts2]=useState([])
  const[total,setTotal]=useState(0)
  const arrayProd=[]
  let aux

  const radio_props = [
    { label: "Retiro en local", value: 0 },
    { label: "Envio a domicilio-Entrega a partir de 5 dias hábiles", value: 1 },
  ]

  useEffect(() => {
    console.log(props.cartProduct)
    console.log(products2)
    props.cartProduct.forEach(item=>{
      props.product(item.productId)
      .then((res)=>{
          aux= {...res.data.response,quantity:item.quantity}
          console.log(products2)
           setProducts2(arrayProd.push(aux))
           if(arrayProd.length !== 0)setProducts(arrayProd) 
      })
      .catch(e=>console.log(e))
    }) 

    return () => {
      console.log('me desmonte en SHOPPING CART')
    }
  }, [])

  const resetSc=()=>{
    if(props.cartProduct.length === 0){
      showMessage({
        message: "El carrito ya esta vacio! ",
        type:'warning',
        backgroundColor: "#f80000",
      })
    }else{
      props.resetCart()
      showMessage({
        message: "Vaciaste el carrito ! ",
        type: "success",
        backgroundColor: "#00bb2d",
      })
    }
  } 
  const endShop=()=>{
    if(props.cartProduct.length>0){
      props.navigation.navigate('Checkout Cart')
    } else{
      showMessage({
        message: 'Debe agregar algun producto al carrito.',
        type: "warning",
        backgroundColor: "rgba(49,25,109,1)",
      });
    }
  }

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
        {props.cartProduct.length === 0?
         <Text style={{color:'white',fontSize:23,fontWeight:'bold',marginVertical:40}}>El carrito esta vacio ! </Text>
        :products.map((product,index) => <CardScProduct key={index} product={product}  setTotal={setTotal} total={total}/>)
        }
        </View>
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <View style={styles.btnAdd}>
            <TouchableOpacity onPress={() => props.navigation.navigate('Productos')}>
              <Text style={{ color: "white", fontSize: 20 }}>
                Agregar mas productos
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnAdd}>
            <TouchableOpacity onPress={resetSc}>
                <Text style={{fontSize:25,color:'white'}}>Vaciar carrito</Text>
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
              <Text style={{ fontSize: 15, color: "white" }}>${props.subtotal}</Text>
            </View>
            <View style={styles.subtext}>
              <Text
                style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
              >
                {props.total>0 ? parseFloat((100-props.total*100/props.subtotal).toFixed(2))+ " % OFF": "- %"}
              </Text>
              <Text style={{ fontSize: 15, color: "white" }}>${(props.total).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
            </View>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <View style={styles.selectView}>
            <Text style={{ color: "white", fontSize: 18, marginVertical: 8 }}>
            Formas de entrega:
            </Text>
            <Text style={{ color: "white", fontSize: 18, marginVertical: 8 }}>
              Retiro en Local
            </Text>
            <Text style={{ color: "white", fontSize: 18, marginVertical: 8 }}>
            Envio a domicilio Gratis-Entrega a partir de 5 dias hábiles
            </Text>
            {/* <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={(value) => setValue(value)}
              labelStyle={{ fontSize: 15, color: "white" }}
            /> */}
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <View style={styles.inputsContainTotal}>
            <Text style={{ color: "white", fontSize: 22, fontWeight: "bold" }}>
              TOTAL:{" "}
            </Text>
            <Text style={styles.textt}>${(props.total).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
          </View>
        </View>
        <View style={{ alignItems: "center", marginVertical: 10,marginBottom:35 }}>
          <View style={styles.btnAdd}>
            <TouchableOpacity onPress={endShop}>
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
  deleteProduct:shopCartActions.deleteToCart,
  product:productsActions.product,
  resetCart:shopCartActions.resetCart,
}

export default connect(mapStateToProps,mapDispatchToProps)(ShoppingCart)

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // alignItems: "center",
    flexGrow: 1
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
    marginVertical:15
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
