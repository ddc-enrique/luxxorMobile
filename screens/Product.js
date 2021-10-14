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
  TouchableOpacity
} from "react-native"
import Header from "../components/Header"
import { LinearGradient } from "expo-linear-gradient"
import CarouselProduct from "../components/CarouselProduct"
import { connect } from "react-redux"
import {useEffect} from 'react'
import productsActions from "../redux/actions/productsActions"
import Novedades from "../components/Novedades"
import shopCartActions from '../redux/actions/shopCartActions'
import { showMessage, hideMessage } from "react-native-flash-message"


const Product = (props) => {
 const [detailsOn, setDetailsOn] = useState(false);
  const [product,setProduct]=useState({})
  const[products, setProducts]= useState(props.products)
  const [modal, setModal] = useState(false);
  const [loading,setLoading]=useState(true)
  const [prodRecomen, setProdRecomen] = useState(false)
  let arrayRecom = []
  useEffect(()=>{
    if(props.products.length===0){
      props.getProducts()
      .then((res)=>{
          setProducts(res)
          setProduct(res.find(product=> product._id===props.route.params.id))
          setLoading(!loading) 
      })
    .catch(error=>{
        setLoading(!loading)
        console.log(error)
      })
    }else{
      setProduct(products.find(product=> product._id===props.route.params.id))
      setLoading(!loading) 
    }

  },[])

  useEffect(()=>{
      if (Object.keys(product).length > 0) {
        setProduct(products.find(product=> product._id===props.route.params.id))
        setLoading(!loading) 
      }
  }, [prodRecomen])
  if (Object.keys(product).length > 0) {
      arrayRecom =products.filter(item => item.category.name === product.category.name && item._id !== product._id)
  }

  const addProductHandler=()=>{
    props.addProduct(props.route.params.id,product.price,product.discount,product.name)
    showMessage({
      message: `Agregaste ${product.name}`,
      type: "success",
      backgroundColor: "#00bb2d",
    })
  }
  
  const clickRecomen = () =>{
    setProdRecomen(!prodRecomen)
    props.navigation.navigate("Producto", {
      id: item._id,
      });
  }

    if(loading){
      return( 
        <ImageBackground source={{uri: 'https://i.postimg.cc/ryjKWhwG/luke-chesser-p-Jad-Qetz-Tk-I-unsplash.jpg'}} style={{flex: 1 , justifyContent: 'center', alignItems: 'center'}}>
          <Image source={{uri: 'https://i.postimg.cc/TwZG2QWc/loading.gif'}} style={{width: 200 , height: 200}} />
      </ImageBackground>)
    }

  return (
	<ImageBackground source={{uri: 'https://i.postimg.cc/ryjKWhwG/luke-chesser-p-Jad-Qetz-Tk-I-unsplash.jpg'}} style={styles.viewContainerHome}>
    <ScrollView>
      <View>
        <Header {...props} />
            <View style={styles.productsContainer}>
            <View style={styles.containerProduct}>
            <Image source={{uri:`https://luxxor.herokuapp.com/productsPhoto/${product.photos[0]}`}} style={styles.photo} />
            <View style={styles.containerTitle}>
            <Text style={styles.subrayado}>{product.category.name}</Text>
            <Text style={styles.text}>{product.name}</Text>
            <Text style={styles.subrayado}>{product.dataSheet[0].optionValue}</Text>
            <Text style={styles.border}>{product.brand.name}</Text>  
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.title}>$ {product.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                <Text style={styles.title2}> $ {(product.price * (1-(product.discount/100))).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</  Text>
            </View>
            </View>
            
            <View style={styles.description} >
            <Text style={styles.info} onPress={() => setDetailsOn(!detailsOn)}>{!detailsOn ? 'VER +' : 'VER -'}</Text>
              </View>
            {detailsOn &&(
            <>
                <View style={styles.boxInfo}>
                    <Text style={styles.info}>Te llega a partir del<Text style={styles.orange}> 16 de Octubre</Text>
                            </Text>
                            <Text style={styles.info}>
                                1 Año de garantia oficial. 10 días para cambios y
                                devoluciones
                            </Text>
                </View>
            </>
            )}
        <Text onPress={() => setModal(!modal)} style={styles.cart}>ESPECIFICACIONES</Text>
  
            <TouchableOpacity onPress={addProductHandler}>
                  <Text style={styles.cart}>AGREGAR AL CARRITO</Text>
            </TouchableOpacity>
           	{modal && (
                <View style={styles.modal}>
                  <Text
                    style={styles.icon}
                    onPress={() => setModal(!modal)}>X</Text>
				  <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textTecnic}>FICHA TÉCNICA</Text>             
                      {/* <Text>{product.optionName} : {product.optionValue}</Text> */}
                <Text style={styles.textTecnic2}>DESCRIPCIÓN</Text>
				<Text style={styles.textTecnic2}>{product.description}</Text>
				</View>
                </View>
              )}

          </View>
          <View style={styles.divRecomendados}>
            <Text style={styles.textRecomendados}>
              También te puede interesar..
            </Text>
            {arrayRecom.map((item)=>
              <TouchableOpacity key={item._id} onPress={clickRecomen}>
                  <View style={{flexDirection: 'column', width:'100%', minHeight: 300,   backgroundColor: '#a7a6a657', marginVertical:15}}>
                      <ImageBackground source={{uri:`https://luxxor.herokuapp.com/productsPhoto/${item.photos[0]}`}} style={styles.photoRecomend}></ImageBackground>
                      <Text style={styles.info}>{item.name}</Text> 
                      <Text style={styles.info}>Precio con descuento  ${(item.price * (1-(item.discount/100))).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                </View>
              </TouchableOpacity>)}
          </View>
            </View>
      {/* el lider es bueno, no hay voluntad, olvidate de ello
       */}
      </View>
    </ScrollView>
	</ImageBackground>
  )
}

const mapStateToProps = (state) => {
  return {
    products:state.products.products
  }
}
const mapDispatchToProps ={
  addProduct:shopCartActions.addToCart,
  getProduct:productsActions.product,
  getProducts:productsActions.products,
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
const styles = StyleSheet.create({
	viewContainerHome:{
        flex: 1
    },
  productsContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  containerProduct: {
  minHeight: 900,
  padding: 1,
  width: '90%',
  justifyContent: 'space-between',
  marginVertical: 50,
},
photo: {
  alignSelf:'center',
  height: 320,
  width: 350,
  // filter: 'dropShadow(-37 45 7 rgba(0, 0, 0, 0.79))'
},
photoRecomend: {
  alignSelf:'center',
  height: 320,
  width: 350,

},
containerTitle: {
	textAlign: 'center',
	fontSize: 20,
	color: 'white',
	paddingTop: 10,
	textTransform: 'uppercase',
	fontWeight: 'bold',
    justifyContent: 'space-between',
    minHeight: 280,
    paddingHorizontal: 10
},
description: {
  height: 100,
  alignItems: 'center',
  justifyContent: 'space-around',
  borderWidth:1,
  borderColor: 'white',
  margin:10
},
boxInfo: {
    height:200,
},
title: {
	fontSize: 40,
	color: 'gray',
  fontFamily: 'Spartan_700Bold',
  textDecorationLine: 'line-through',
  textDecorationColor: 'red',
  textDecorationStyle:'solid',
},
title2: {
	fontSize: 40,
	color: 'white',
  fontFamily: 'Spartan_700Bold',
},
cart: {
    // borderBottom: 1,
    borderColor: 'white',
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    paddingVertical: 10,
    margin:10,
    borderBottomWidth: 1
},
subrayado: {
    fontSize:22,
    textDecorationLine : 'underline',
    color: 'white',
    fontFamily: 'Spartan_400Regular',
    paddingVertical:1
},
border: {
    fontSize:30,
    borderWidth:1,
    minWidth:150,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'white',
    borderColor: 'white',
    fontFamily: 'Spartan_700Bold',
    padding: 10,
    marginVertical:10
},
info: {
      fontSize:25,
      color: 'white',
      padding:10,
      fontFamily: 'Spartan_400Regular'
  },
button: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#000000a8',
    color: 'white',
    padding: 10,
    margin:10,
},

  text: {
    color: "white",
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'Spartan_700Bold'
  },
  textRecomendados:{
    color: "white",
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Spartan_700Bold'
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
    width: '95%',
    position: 'absolute',
    top: 420,
    margin: 12,
    padding: 10,
    borderRadius: 2,
    borderRadius: 10,
    backgroundColor: '#fffffff1',
    shadowOpacity: 1,
        shadowRadius: 3,
        shadowOffset: {
            height: 500,
            width: 100
    },
        elevation: 40,
        borderRadius: 5,
         shadowColor: 'black',
  },
    icon: {
        fontSize: 20,
        textAlign: 'center',
        borderWidth:1,
        borderRadius:100,
        width:30,
        backgroundColor:'black',
        color: 'white',
        borderWidth:1
    },
    textTecnic: {
        textAlign: 'center',
        fontSize:20,
        fontFamily: 'Spartan_700Bold',
        margin:10
    },
    textTecnic2: {
        fontSize:15,
        fontFamily: 'Spartan_700Bold'
    },
  cardTitleText:{
    marginLeft:15,
    fontSize:20,
    paddingVertical:5
  },
  centerCard:{
      alignItems: "center",
  },
  prices:{
    flexDirection:'row',
    justifyContent: 'space-between',
    flex:1, 
    marginVertical:10
  },
  divRecomendados:{
    justifyContent: "center",
    alignItems:"center"
  }
})


