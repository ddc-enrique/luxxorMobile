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
    console.log(props.id)
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
        <View style={styles.containerAll}>

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
                                {item.shopCart.map(shop=> {
                                    <View style={styles.container}>
                                        {console.log(shop.productId)}
                                        <ScrollView style={styles.productContainer}>
                                            <ImageBackground style={styles.photoProduct} source={{uri:`http://luxxor.herokuapp.com/productsPhoto/${shop.productId.photos[0]}`}}>
                                            </ImageBackground>
                                            <Text>{shop.productId.name}</Text>
                                            <Text>{shop.quantity}</Text>
                                        </ScrollView>
                                        <Text>Total: ${item.amount}</Text>
                                    </View>
                                })}
                            </View>
                        </View>
                    </View>
                )}
            /> :
                <View>
                    <Text>No tienes compras realizadas</Text>
                    
                </View>
            }
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        firstName:state.users.firstName,
    }
}

const mapDispatchToProps = {
    myShopping: productsActions.productsByUser
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPurchase)

const styles = StyleSheet.create({
    containerAll: {
        
    },

    flatList: {
        height: "80%",
        width: "100%",
        backgroundColor: "blue"
    },

    containerOne: {
        alignSelf: "center",
        width: "90%",
        backgroundColor: "#e3e3e33f",
        height: 300
    },

    shopCart: {
        height: "100%",
        width: "100%",
        backgroundColor: "yellow"
    },
    
    container: {
        flexDirection: "row",
        width: "100%",
        height: "70%",
        backgroundColor: "gray"
    },

    cardContainer: {
        alignSelf: "center",
        width: "90%",
        height: "100%",
        backgroundColor: "red",
    },

    text: {
        color: "white",
        fontSize: 17,
    },


    photoProduct: {
        width: "15%",
        height: "15%",
    },

    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },

    productContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "red"
    },
})



