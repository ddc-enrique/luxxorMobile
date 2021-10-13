import React, { useEffect, useState } from "react";
import Carousel from 'react-native-snap-carousel';
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const widthCarousel = Dimensions.get('window').width

const CarouselProduct = (props) =>{
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
                    data={props.products}
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


export default CarouselProduct

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