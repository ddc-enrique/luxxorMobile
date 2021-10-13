import React from "react";
import { View,StyleSheet, Text, Image, Dimensions } from "react-native";
import Carousel from 'react-native-snap-carousel';

const SectionInfo = () => {
    const images = [
        {pic: 'https://i.postimg.cc/YSDGN5j5/Dise-o-sin-t-tulo-64.png', title: 'Elegí cómo pagar', text: 'Tarjetas ,transferencia bancaria o PayPal'} , 
        {pic: 'https://i.postimg.cc/RZD4g4QL/camion.png', title: 'ENVÍOS A TODO EL PAÍS', text: '¡Rápido, sin vueltas!'} ,
        {pic: 'https://i.postimg.cc/V6srXYYB/seguridad.png', title: 'COMPRA 100% SEGURA', text: 'Garantías Oficiales'},
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
                    loop={true}
                    autoplay={true}
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
        textAlign: "center",
        width: '80%'
    }
})

// backgroundColor:'#e3e3e3',