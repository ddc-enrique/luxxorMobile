import React from "react";
import { View,StyleSheet, Text, Image, Dimensions } from "react-native";
import Carousel from 'react-native-snap-carousel';

const CarouselProduct = (props) => {
    // console.log(props)
    const images = [
        {pic: 'https://i.postimg.cc/Jhmptvkj/1000x1000-1-removebg-preview-1.png'} , 
        {pic: 'https://i.postimg.cc/Jhmptvkj/1000x1000-1-removebg-preview-1.png'} ,
        {pic: 'https://i.postimg.cc/Jhmptvkj/1000x1000-1-removebg-preview-1.png'},
]
    const renderItem = ({item}) => {
        return (
            <View style={styles.slide} >
                <Image source={{uri: item.pic}} style={styles.slideImg} />
            </View>
        );
    }
    return(
        <View style={styles.viewContainerCategories} >
        <View style={styles.slide}> 
            <Carousel
                    data={images}
                    renderItem={renderItem}
                    sliderWidth={500}
                    itemWidth={580}
                    loop
        />
        </View>
    </View>

    )
}
export default CarouselProduct

const styles= StyleSheet.create({
    viewContainerCategories:{
        width: Dimensions.get('window').width,
    },
    slideImg: {
        height: 420,
        minWidth: 350,
    },
    slide:{
        height: 500,
        justifyContent:"center",
        alignItems: "flex-start",
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