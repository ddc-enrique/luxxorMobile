import React, { useEffect, useState } from "react";
import Carousel from 'react-native-snap-carousel';
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground } from "react-native";
import productsActions from "../redux/actions/productsActions";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

const widthCarousel = Dimensions.get('window').width

const Novedades = (props) =>{
    const[products, setProducts] = useState([])
    useEffect(()=>{
        props.getProducts()
        .then((res)=>{
            setProducts(res.reverse().slice(0, 6))
        })
    },[])
    const renderItem = ({item}) => {
        return (
            <View style={styles.slide} >
                <TouchableOpacity onPress={() => {
                props.navigation.navigate("Producto", {
                id: item._id,
                });
                }} >
                    <ImageBackground source={{uri:`https://luxxor.herokuapp.com/productsPhoto/${item.photos[0]}`}} resizeMode="cover"  style={styles.slideImg} ></ImageBackground>
                    <Text style={styles.slideText}>{item.name} ${item.price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                </TouchableOpacity>
                    </View>
        );
    }
    return(
        <View style={styles.viewContainerCategories} >
            <View>
                <Carousel
                    data={products}
                    renderItem={renderItem}
                    sliderWidth={widthCarousel*0.96}
                    itemWidth={widthCarousel}
                    loop={true}
                    autoplay={true}
                />
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        products:state.products.products
    }
}
const mapDispatchToProps ={
    getProducts:productsActions.products,
}

export default connect(mapStateToProps, mapDispatchToProps)(Novedades)

const styles = StyleSheet.create({
    viewContainerCategories:{
        width: Dimensions.get('window').width,
        height: 650,
        marginBottom:50
    },
    slide:{
        width: '80%',
        height:600,
        marginHorizontal:50,
        padding: 2,
        alignItems: "center",
        backgroundColor: '#a7a6a657'
    },
    slideImg:{
        width: "100%",
        height: 450,
    },
    slideText:{
        fontSize: 25,
        fontFamily: 'Spartan_500Medium',
        color:'#e3e3e3',
        textAlign: 'center',
        paddingVertical:20
    }
})