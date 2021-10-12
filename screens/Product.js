import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  ImageBackground,
  Button,
  Link,
  Image,
  TouchableOpacity,
} from "react-native"
import Header from "../components/Header"
import { LinearGradient } from "expo-linear-gradient"
import CarouselProduct from "../components/CarouselProduct"
import { connect } from "react-redux"
import { useEffect } from "react"
import productsActions from "../redux/actions/productsActions"
import Novedades from "../components/Novedades"
import shopCartActions from '../redux/actions/shopCartActions'
import { showMessage, hideMessage } from "react-native-flash-message"

const Product = (props) => {
  const [detailsOn, setDetailsOn] = useState(false)
  const [product, setProduct] = useState({})
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (props.products.length === 0) {
      props
        .getProduct(props.route.params.id)
        .then((res) => {
          if (!res.data.success) {
            console.log(
              "Disculpe,tenemos problemas tecnicos,vuelva en unos minutos."
            )
          } else {
            setProduct(res.data.response)
          }
          setLoading(!loading)
        })
        .catch((error) => {
          setLoading(!loading)
          console.log(error)
          console.log("Problemas tecnicos")
        })
    } else {
      setProduct(
        props.products.find((product) => product._id === props.route.params.id)
      )
    }
  }, [])

  useEffect(() => {
    
    return () => {
      console.log(props.cartProduct)
      console.log('salgo de product!')
    }
  }, [])

  const addProductHandler = () => {
    props.addProduct(props.route.params.id, product.price)
    showMessage({
      message: "Agregaste producto! ",
      type: "success",
      backgroundColor: "#00bb2d",
    })
    props.navigation.navigate('ShoppingCart')
    // console.log(product) va discount?
    console.log("ejecuto la addProductHandler")
  }

  return (
    <ImageBackground
      source={{
        uri:
          "https://i.postimg.cc/ryjKWhwG/luke-chesser-p-Jad-Qetz-Tk-I-unsplash.jpg",
      }}
      style={styles.viewContainerHome}
    >
      <ScrollView>
        <View>
          <Header {...props} />
          <View style={styles.productsContainer}>
            <View style={styles.containerProduct}>
              <CarouselProduct photos={product.photos} />
              {/* <Image style={styles.photo} source={{ uri:`https://i.postimg.cc/Jhmptvkj/1000x1000-1-removebg-preview-1.png`}}/> */}
              <View style={styles.containerTitle}>
                <Text style={styles.subrayado}>Informática</Text>
                <Text style={styles.text}>{product.name}</Text>
                <Text style={styles.subrayado}>Diseño elegante y plegable</Text>
                <Text style={styles.border}>SONY</Text>
                <Text style={styles.title}>$ {product.price}</Text>
                {/* POPULAR BRAND  */}
              </View>

              <View style={styles.description}>
                <Text
                  style={styles.info}
                  onPress={() => setDetailsOn(!detailsOn)}
                >
                  {!detailsOn ? "VER +" : "VER -"}
                </Text>
              </View>
              {detailsOn && (
                <>
                  <View style={styles.boxInfo}>
                    <Text style={styles.info}>CARACTERÍSTICAS</Text>
                    <Text style={styles.info}>Ver todas las promociones</Text>
                    <Text style={styles.info}>
                      Te llega a partir de{" "}
                      <Text style={styles.orange}>Mañana 6 de Octubre</Text>
                    </Text>
                    <Text style={styles.info}>
                      1 Año de garantia oficial. 10 días para cambios y
                      devoluciones
                    </Text>
                  </View>
                </>
              )}
              <Text onPress={() => setModal(!modal)} style={styles.cart}>
                ESPECIFICACIONES
              </Text>
              <TouchableOpacity onPress={addProductHandler}>
                <Text style={styles.cart}>AGREGAR AL CARRITO </Text>
              </TouchableOpacity>

              {/* onPress={() => {props.addProduct(props.route.params.id)}} */}
              {modal && (
                <View style={styles.modal}>
                  <Text style={styles.icon} onPress={() => setModal(!modal)}>
                    X
                  </Text>
                  <View>
                    {/* {console.log(product.dataSheet)} */}
                    <Text style={styles.textTecnic}>FICHA TÉCNICA</Text>
                    {/* {
                product.dataSheet.map(item =>{
                    <>
                      <Text>{item.optionName}: {item.optionValue}</Text>
                    </>
                })
              } */}
                    <Text style={styles.textTecnic2}>DESCRIPCIÓN</Text>
                    <Text style={styles.textTecnic2}>
                      {product.description}
                    </Text>
                  </View>
                </View>
              )}
            </View>
            <View style={styles.divRecomendados}>
              <Text style={styles.textRecomendados}>
                También te puede interesar..
              </Text>
              <Novedades />
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  )
}

const mapStateToProps = (state) => {
  return {
    cartProduct: state.shopCart,
    products: state.products.products,
  }
}
const mapDispatchToProps = {
  addProduct: shopCartActions.addToCart,
  getProduct: productsActions.product,
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)

const styles = StyleSheet.create({
  viewContainerHome: {
    flex: 1,
  },
  productsContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  containerProduct: {
    minHeight: 900,
    padding: 1,
    width: "90%",
    justifyContent: "space-between",
    marginVertical: 50,
  },
  photo: {
    height: 320,
    width: 350,
  },

  containerTitle: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    paddingTop: 10,
    textTransform: "uppercase",
    fontWeight: "bold",
    justifyContent: "space-between",
    minHeight: 280,
    paddingHorizontal: 10,
  },
  description: {
    height: 100,
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "white",
    margin: 10,
  },
  boxInfo: {
    height: 300,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 40,
    color: "white",
    fontFamily: "Spartan_700Bold",
  },
  cart: {
    // borderBottom: 1,
    borderColor: "white",
    textAlign: "center",
    color: "white",
    fontSize: 30,
    paddingVertical: 10,
    margin: 10,
    borderBottomWidth: 1,
  },
  subrayado: {
    fontSize: 22,
    textDecorationLine: "underline",
    color: "white",
    fontFamily: "Spartan_400Regular",
    paddingVertical: 1,
  },
  border: {
    fontSize: 30,
    borderWidth: 1,
    minWidth: 150,
    textAlign: "center",
    textTransform: "uppercase",
    color: "white",
    borderColor: "white",
    fontFamily: "Spartan_700Bold",
    padding: 10,
    marginVertical: 10,
  },
  info: {
    fontSize: 25,
    color: "white",
    padding: 10,
    fontFamily: "Spartan_400Regular",
  },
  button: {
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "#000000a8",
    color: "white",
    padding: 10,
    margin: 10,
  },

  text: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
    fontFamily: "Spartan_700Bold",
  },
  textRecomendados: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Spartan_700Bold",
  },
  uniqueRadio: {
    marginHorizontal: 8,
  },
  selectOptions: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    paddingVertical: 10,
  },
  category: {
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  modal: {
    minHeight: 300,
    width: "95%",
    position: "absolute",
    top: 420,
    margin: 12,
    padding: 10,
    borderRadius: 2,
    borderRadius: 10,
    backgroundColor: "#fffffff1",
    shadowOpacity: 1,
    shadowRadius: 3,
    shadowOffset: {
      height: 500,
      width: 100,
    },
    elevation: 40,
    borderRadius: 5,
    shadowColor: "black",
  },
  icon: {
    fontSize: 20,
    textAlign: "center",
    borderWidth: 1,
    borderRadius: 100,
    width: 30,
    backgroundColor: "black",
    color: "white",
    borderWidth: 1,
  },
  textTecnic: {
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Spartan_700Bold",
    margin: 10,
  },
  textTecnic2: {
    fontSize: 15,
    fontFamily: "Spartan_700Bold",
  },
  cardTitleText: {
    marginLeft: 15,
    fontSize: 20,
    paddingVertical: 5,
  },
  centerCard: {
    alignItems: "center",
  },
  prices: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginVertical: 10,
  },
  divRecomendados: {
    justifyContent: "center",
    alignItems: "center",
  },
})
