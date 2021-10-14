import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions
} from "react-native"
import Header from "../components/Header"
import { connect } from "react-redux"
import {useEffect} from 'react'
import productsActions from "../redux/actions/productsActions"
import SelectPicker from "react-native-form-select-picker"
import FilterProducts from "../components/FilterProducts"
import {showMessage} from "react-native-flash-message"
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select'
import {Ionicons } from '@expo/vector-icons'

const cardsWidth = (Dimensions.get("screen").width)*0.9


const Products = (props) => {
  const [products, setProducts] = useState(props.products)
  const [filteredProducts, setFilteredProducts] = useState(props.products)
  const [updateOnSort, setUpdateOnSort] = useState(true)
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState()
  
  useEffect(()=> {
    const getAllProducts = async() =>{
      if(!products.length) {
          try {
          let response = await props.getProducts()
              // console.log(response)
          if(!Array.isArray(response)) throw new Error(response.response)         
          setProducts(response)
          setFilteredProducts(response)
          } catch (error) {
            showMessage({
              "message":error,
              "type":"danger"
            })
          }                
      }
    }
    getAllProducts()
    setLoading(false)
  },[])

  const sortProducts = (sortBy) => {
    switch (sortBy) {
      case "lowerPrice":
        setFilteredProducts(
          filteredProducts.sort((productA, productB) => productA.price - productB.price)
        )
        break;

      case "higherPrice":
        setFilteredProducts(
          filteredProducts.sort((productA, productB) => productB.price - productA.price)
        )
        break;
      
      case "A-Z":
        setFilteredProducts(
          filteredProducts.sort((productA, productB) => {
            if (productA.name > productB.name) {
              return 1;
            }
            if (productA.name < productB.name) {
              return -1;
            }
            return 0;
          })
        )
        break;

      case "Z-A":
        setFilteredProducts(
          filteredProducts.sort((productA, productB) => {
            if (productA.name < productB.name) {
              return 1;
            }
            if (productA.name > productB.name) {
              return -1;
            }
            return 0;
          })
        )
        break;

      case "mostRelevants":
        setFilteredProducts(
          filteredProducts.sort((productA, productB) => {
            if (productA._id > productB._id) {
              return 1;
            }
            if (productA._id < productB._id) {
              return -1;
            }
            return 0;
          })
        )
        break;

      default:
        break;
    }
    setUpdateOnSort(!updateOnSort)
  }

  const options = ["Más Relevantes","Mayor precio", "Menor precio", "A-Z", "Z-A"]
  const image = {
      uri: "https://i.postimg.cc/Jhmptvkj/1000x1000-1-removebg-preview-1.png",
  }

  if(loading){
    return( 
      <ImageBackground source={{uri: 'https://i.postimg.cc/ryjKWhwG/luke-chesser-p-Jad-Qetz-Tk-I-unsplash.jpg'}} style={{flex: 1 , justifyContent: 'center', alignItems: 'center'}}>
        <Image source={{uri: 'https://i.postimg.cc/TwZG2QWc/loading.gif'}} style={{width: 200 , height: 200}} />
    </ImageBackground>)
  }

  return (
    <ImageBackground source={{uri: 'https://i.postimg.cc/ryjKWhwG/luke-chesser-p-Jad-Qetz-Tk-I-unsplash.jpg'}} style={styles.viewContainerHome}>
        <FlatList        
            ListHeaderComponent={
                <View >
                    <Header {...props} />
                    <FilterProducts 
                      setFilteredProducts={setFilteredProducts}
                    />
                    <View style={styles.selectOptions}>
                        <Text style={styles.orderText}>Ordenar</Text>
                        <RNPickerSelect 
                          items={[
                            {label:"Más Relevantes", value:"mostRelevants"},
                            {label:"Mayor Precio", value:"higherPrice"},
                            {label:"Menor Precio", value:"lowerPrice"},
                            {label:"A-Z", value:"A-Z"},
                            {label:"Z-A", value:"Z-A"}
                          ]}
                          onValueChange={(value) => sortProducts(value)}
                          placeholder={{}}
                          placeholderTextColor= '#e3e3e3'
                        />
                    </View>
                </View>
            }
            data={filteredProducts}
            keyExtractor={(product) => product._id}
            contentContainerStyle={styles.cardContainer}
            renderItem={({ item }) => {
                return(
                    <View style={styles.card} >
                        <Image style={styles.image} source={{ uri:`https://luxxor.herokuapp.com/productsPhoto/${item.photos[0]}` }}/>
                        <View style={styles.content}>
                            <Text style={styles.title}>{item.name}</Text>
                            <View style={styles.description}>
                                {item.discount>0 && <Text style={styles.cardText}>%{item.discount} Off</Text>}
                                <Text style={styles.cardText}>${(item.price * (1-(item.discount/100))).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => {
                                    props.navigation.navigate("Producto", {
                                    id: item._id,
                                    });
                                }}
                            >
                                <Text style={styles.buttonText}>Ver +</Text>
                            </TouchableOpacity>                            
                        </View>
                    </View>
                )
            }}
            ListEmptyComponent={
                <View style={styles.emptyProducts}>
                    <Text>Ups! No tenemos productos que pasen ese filtro :(</Text>
                </View>
            }

        />
    </ImageBackground>
  )
}
const mapDispatchToProps = {
  getProducts: productsActions.products,
}

const mapStateToProps = (state) => {
  return{
    products: state.products.products
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Products)

const styles = StyleSheet.create({
	viewContainerHome:{
    flex: 1
  },
  preLoader:{
    width: cardsWidth,
    height: 200,
  },
  card: {
    minHeight: 420,
    minWidth: cardsWidth,
    padding: 1,
    paddingHorizontal:10,
    width: '90%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 50,
  },
  image: {
    height: 320,
    width: 350,
    // top:-55,
    // position: 'absolute',
    // zIndex: 1
  },
  content: {
    width: '95%',
    paddingTop: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    paddingTop: 10,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  description: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  cardText: {
    fontSize: 20,
    color: 'white'
  },
  button: {
    // borderWidth:1,
    backgroundColor: '#000000a8',
    padding: 10,
    marginBottom: 10,
    width: cardsWidth*0.9,
  },
  buttonText:{
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    textTransform: 'uppercase'
  },
  uniqueRadio: {
    marginHorizontal: 8,
  },
  orderText:{
    color: "white",
    fontSize: 30,
    fontFamily: 'Spartan_500Medium',
    marginBottom: 5,
  },
  selectOptions: {
    width: '40%',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    marginLeft: 60,
    marginTop:20,
    paddingLeft:2
  },
  

  // input: {
  //   height: 40,
  //   width: 230,
  //   margin: 12,
  //   padding: 10,
  //   borderRadius: 2,
  //   borderColor: "#000e19",
  //   borderStyle: "solid",
  //   borderWidth: 1,
  //   borderRadius: 10,
  //   // backgroundColor: "white",
  // },
  cardContainer: {
    alignItems: "center",
  },
 
  cardTitle: {
      //color:'white'
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
  }
})
