import React from "react";
import Carousel from 'react-native-snap-carousel';
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

const widthCarousel = Dimensions.get('window').width

const Novedades = () =>{
    const images = [{pic: 'https://i.postimg.cc/9fNRMm8P/1000x1000_1-removebg-preview.png', name: 'Macbook Pro 13 M1 Chip Ram 8gb 256gb Silver'} , 
    {pic: 'https://i.postimg.cc/SKYqgXsy/8a9591545481ca29b3f44f9ed47b7d23-removebg-preview.png', name: 'Auriculares Inalambricos Sony Bluetooth'},
]
    const renderItem = ({item}) => {
        return (
            <View style={styles.slide} >
                <Image source={{uri: item.pic}} style={styles.slideImg} />
                <Text style={styles.slideText}>{item.name}</Text>
            </View>
        );
    }
    return(
        <View style={styles.viewContainerCategories} >
            <View>
                <Carousel
                    data={images}
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

export default Novedades

const styles = StyleSheet.create({
    viewContainerCategories:{
        width: Dimensions.get('window').width,
        alignItems: "center",
        height: 500,
        marginBottom:50
    },
    slide:{
        width: '80%',
        height: 50,
    },
    slideImg:{
        width: "100%",
        height: 350,
    },
    slideText:{
        fontSize: 20,
        fontFamily: 'Spartan_400Regular',
        color:'#e3e3e3',
    }
})