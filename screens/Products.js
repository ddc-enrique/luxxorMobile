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
  Image
} from "react-native"
import Header from "../components/Header"
import { LinearGradient } from "expo-linear-gradient"
import { connect } from "react-redux"
import {useEffect} from 'react'
import productsActions from "../redux/actions/productsActions"
import SelectPicker from "react-native-form-select-picker"

const Products = (props) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [updateOnSort, setUpdateOnSort] = useState(true)
  const [loading, setLoading] = useState(true)
  const [isEnabled, setIsEnabled] = useState(false)
  const [selected, setSelected] = useState()
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)
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
          console.log(error)
        }                
      }
    }
    getAllProducts()
    setLoading(false)
  },[])

  const options = ["Mayor precio", "Menor precio", "A-Z","Z-A"]
  const image = {
    uri: "https://i.postimg.cc/Jhmptvkj/1000x1000-1-removebg-preview-1.png",
  }

  return (
	   <ImageBackground source={{uri: 'https://i.postimg.cc/ryjKWhwG/luke-chesser-p-Jad-Qetz-Tk-I-unsplash.jpg'}} style={styles.viewContainerHome}>
    <ScrollView>
      <View>
        <Header {...props} />
        <LinearGradient
          colors={[" rgba(47,144,176,0.5)", "rgba(48,106,154,0.5)"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
          <Text style={styles.text}>Marca</Text>
          <View style={styles.category}>
            <View style={styles.uniqueRadio}>
              <Text>Option 1</Text>
              <Switch
                trackColor={{ false: "#767577", true: "rgba(49,25,109,1)" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <View style={styles.uniqueRadio}>
              <Text>Option 1</Text>
              <Switch
                trackColor={{ false: "#767577", true: "rgba(49,25,109,1)" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
          <Text style={styles.text}>Categoria</Text>
          <View style={styles.category}>
            <View style={styles.uniqueRadio}>
              <Text>Option 1</Text>
              <Switch
                trackColor={{ false: "#767577", true: "rgba(49,25,109,1)" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <View style={styles.uniqueRadio}>
              <Text>Option 1</Text>
              <Switch
                trackColor={{ false: "#767577", true: "rgba(49,25,109,1)" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
        </LinearGradient>
        <View style={styles.selectOptions}>
          <Text>Ordena por:</Text>
          <SelectPicker
            placeholderStyle={{ color: "black" }}
            onValueChange={(value) => {
              setSelected(value)
            }}
            selected={selected}
            style={styles.input}
            placeholder="Rango a elegir"
          >
            {Object.values(options).map((val, index) => (
              <SelectPicker.Item label={val} value={val} key={index} />
            ))}
          </SelectPicker>
        </View>
        <View style={styles.cardContainer}>
		{
			products.map(product => (
                    <View style={styles.card} key={product._id} >
					<Image style={styles.image} source={{ uri:`https://luxxor.herokuapp.com/producto/${product.photos[0]}` }}/>
                        <View style={styles.content}>
                            <Text style={styles.title}>{product.name}</Text>
                        <View style={styles.description}>
						  {product.discount>0 && <Text style={styles.cardText}>%{product.discount} Off</Text>}
                            <Text style={styles.cardText}>${(product.price * (1-(product.discount/100))).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
							</View>
							<Text
								style={styles.button}
								onPress={() => {
								props.navigation.navigate("Producto", {
								id: product._id,
								});
							}}
								>
								Ver +
							</Text>
                            {/* <Link to={`/producto/${product._id}`}> <Button style={styles.btn}>Ver +</Button></Link> */}
						
                      </View>
                    </View>
            ))}
			{/* {
              !products.length && 
              <View style={styles.emptyProducts}>
                <Text>Ups! No tenemos productos que pasen ese filtro :(</Text>
              </View>
            } */}
         
        </View>
      </View>
    </ScrollView>
	   </ImageBackground>
  )
}
const mapDispatchToProps = {
  getProducts: productsActions.products,
}

const mapStateToProps = (state) => {
  return{
    brands: state.products,
    categories: state.products,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Products)

const styles = StyleSheet.create({
	viewContainerHome:{
        flex: 1
    },
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  card: {
	borderWidth: 1,
	borderColor: 'grey',
  minHeight: 420,
  padding: 1,
  width: '90%',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginVertical: 50,
},
image: {
  height: 320,
  width: 350,
  top:-55,
  position: 'absolute',
  zIndex: 1
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
	fontSize: 20,
	textAlign: 'center',
	backgroundColor: '#000000a8',
	color: 'white',
	padding: 10,
	marginBottom: 10,
	textTransform: 'uppercase'
},
  text: {
    color: "white",
    fontSize: 30,
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
  input: {
    height: 40,
    width: 230,
    margin: 12,
    padding: 10,
    borderRadius: 2,
    borderColor: "#000e19",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    // backgroundColor: "white",
  },
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
