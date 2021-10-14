import {
    StyleSheet,
    Text,
    TextInput,
    View,
    ImageBackground,
    Image,
    FlatList,
    TouchableOpacity,
    Dimensions,
    ScrollView
  } from "react-native"
import React, { useEffect, useState } from "react"
import productsActions from "../redux/actions/productsActions"
import { connect } from "react-redux"
import moment from "moment"

const UserPurchase = (props) => {
    const [myProduct, setMyProduct] = useState()
    const [error, setError] = useState("")

    useEffect(()=> {
        const myShops = async () => {
            let response = await props.myShopping(props.id)
            if (!response.success) setError(response.response)
            setMyProduct(response)
        }
        myShops()
    }, [])



    return (
        <View contentContainerStyle={error && styles.containerAll}>

            {!error ? <FlatList 
                style={styles.flatList}
                data={myProduct}
                keyExtractor={item => item._id}
                renderItem={({item})=> (
                    
                    <View style={styles.containerOne}>
                        <Text style={styles.text}>Orden: #{item.numberOrder}</Text>
                        <Text style={styles.text}>Fecha: {moment(item.date).format("DD/MM/YYYY")}</Text>
                        <View style={styles.cardContainer}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>Productos</Text>
                                <Text style={styles.title}>Nombre</Text>
                                <Text style={styles.title}>Cantidad</Text>
                            </View>
                            <View style={styles.shopCart}>
                                {item.shopCart.map((shop, index)=> {
                                   return <View style={styles.container} key={item._id + index}>
                                        <ScrollView contentContainerStyle={styles.productContainer}>
                                            <ImageBackground style={styles.photoProduct} source={{uri:`http://luxxor.herokuapp.com/productsPhoto/${shop.productId.photos[0]}`}}>
                                            </ImageBackground>
                                            <Text>{shop.productId.name}</Text>
                                            <Text>{shop.quantity}</Text>
                                        </ScrollView>
                                        
                                    </View>
                                })}
                                <Text style={styles.totalAmount}>Total: ${item.amount}</Text>
                            </View>
                        </View>
                    </View>
                )}
            /> :
                <View style={styles.containConditional}>
                    <Text style={styles.textConditional}>No tienes compras realizadas. {"\n"}{"\n"}

                    {/* </Text>
                    
                    <Text style={styles.textConditional}> */}
                        Puedes comprar presionando <TouchableOpacity
                                                        onPress={()=> props.navigation.navigate('Productos')}
                                                    ><Text style={styles.textConditionalCA}>AQUÍ</Text></TouchableOpacity>
                    </Text>
                </View>
            }
        </View>
    )
}



const mapDispatchToProps = {
    myShopping: productsActions.productsByUser
}

export default connect(null, mapDispatchToProps)(UserPurchase)

const styles = StyleSheet.create({

    flatList: {
        height: "80%",
        width: "100%",
    },

    containerOne: {
        alignSelf: "center",
        width: "90%",
        backgroundColor: "#e3e3e33f",
        height: 150,
        marginBottom: 15
    },

    shopCart: {
        marginTop: 9,
        height: "50%",
        width: "100%",
    },
    
    container: {
        flexDirection: "row",
        width: "100%",
        height: "100%",
    },

    text: {
        color: "white",
        fontSize: 17,
    },

    photoProduct: {
        width: 50,
        height: 50,
    },

    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },

    productContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },

    totalAmount: {
        textAlign: "right",
        marginRight: 10,
    },
    containerAll: {
        height: "100%",
    },

    containConditional: {
        height: 600,
        justifyContent: "space-around",
        alignItems: "center",
        // backgroundColor: "red"
    },

    textConditional: {
        alignSelf: "center",
        textAlign: "center",
        fontSize: 35,
        fontFamily: 'Spartan_500Medium',
        color: "white"
    },
    textConditionalCA: {
        alignSelf: "center",
        textAlignVertical: "center",
        textAlign: "center",
        fontSize: 35,
        fontFamily: 'Spartan_500Medium',
        color: "white",
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "white"
    },
})



