import React from "react";
import { View,StyleSheet, Text, Image, Dimensions } from "react-native";
import Carousel from 'react-native-snap-carousel';

const SectionInfo = () => {
    const images = [
        {pic: 'https://i.postimg.cc/YSDGN5j5/Dise-o-sin-t-tulo-64.png', title: 'Elegí cómo pagar', text: 'Podés pagar con tarjeta, débito, efectivo o hasta 12 cuotas sin tarjeta con Mercado Crédito.'} , 
        {pic: 'https://i.postimg.cc/RZD4g4QL/camion.png', title: 'Envío gratis desde $ 3.000', text: 'Solo por estar registrado en Mercado Libre tenés envíos gratis en miles de productos. Es un beneficio de Mercado Puntos.'} ,
        {pic: 'https://i.postimg.cc/V6srXYYB/seguridad.png', title: 'Seguridad, de principio a fin', text: '¿No te gusta? ¡Devolvelo! En Mercado Libre, no hay nada que no puedas hacer, porque estás siempre protegido.'},
]
    const renderItem = ({item}) => {
        return (
            <View style={styles.slide} >
                <Text style={styles.slideTitle}>{item.title}</Text>
                <Image source={{uri: item.pic}} style={styles.slideImg} />
                <Text style={styles.slideText}>{item.text}</Text>
            </View>
        );
    }
    return(
        <View style={styles.viewContainerCategories} >
        <View style={styles.slide}> 
            <Carousel
                    data={images}
                    renderItem={renderItem}
                    sliderWidth={600}
                    itemWidth={580}
                    loop
        />
        </View>
    </View>

    )
}
export default SectionInfo

const styles= StyleSheet.create({
    viewContainerCategories:{
        width: Dimensions.get('window').width,
        alignItems: "center",
        height: 500,
        marginVertical: 50,
        borderWidth: 0.8,
        borderColor: "#e5e5e521",
    },
    slideImg:{
        width: 250,
        height: 200
    },
    slide:{
        height: 500,
        justifyContent:"space-evenly",
        alignItems: "center",
        opacity: 0.9,
    },
    slideTitle:{
        fontSize:25,
        fontFamily: 'Spartan_400Regular',
        color: "#e3e3e3",
        textTransform: "uppercase"
    },
    slideText:{
        fontSize: 20,
        color: "#e3e3e3",
        fontFamily: 'Spartan_400Regular',
        // backgroundColor: 'pink',
        width: '80%'
    }
})

// backgroundColor:'#e3e3e3',