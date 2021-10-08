import React from "react";
import Carousel from 'react-native-snap-carousel';
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

const Categories = () =>{
    const images = [{pic: 'https://i.postimg.cc/9fNRMm8P/1000x1000_1-removebg-preview.png', name: 'Celulares y Teléfonos'} , 
    {pic: 'https://i.postimg.cc/9fNRMm8P/1000x1000_1-removebg-preview.png', name: 'Computación'} ,
    {pic: 'https://i.postimg.cc/9fNRMm8P/1000x1000_1-removebg-preview.png', name: 'Consola y Videojuegos'},
    {pic: 'https://i.postimg.cc/SKYqgXsy/8a9591545481ca29b3f44f9ed47b7d23-removebg-preview.png', name: 'Electrónica, Audio y Video'},
    {pic: 'https://i.postimg.cc/9fNRMm8P/1000x1000_1-removebg-preview.png', name: 'Cámaras y Accesorios'}
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
                <Text style={styles.textCategories}>
                    CATEGORIAS
                </Text>
                <Carousel
                        data={images}
                        renderItem={renderItem}
                        sliderWidth={500}
                        itemWidth={700}
                        loop
            />
            </View>
        </View>
    )
}

export default Categories

const styles = StyleSheet.create({
    viewContainerCategories:{
        width: Dimensions.get('window').width,
        alignItems: "center",
        height: 500,
        marginBottom:50
    },
    textCategories:{
        fontFamily: 'Spartan_400Regular',
        fontSize: 30,
        textAlign: "justify",
        marginVertical:10,
        color:'#e3e3e3'
    },
    slide:{
        width: '80%',
        height: 500,
    },
    slideImg:{
        width: 500,
        height: 400,
    },
    slideText:{
        fontSize: 25,
        fontFamily: 'Spartan_400Regular',
        color:'#e3e3e3'
    }
})