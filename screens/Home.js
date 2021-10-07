import { Text, View, StyleSheet,ScrollView, Dimensions, ImageBackground } from "react-native"
import React from 'react';
import Header from "../components/Header";



const Home = (props)=>{
    return(
        <View style={styles.viewContainerHeader}>
            <ScrollView>
                <Header {...props}/>
                <View style={styles.viewHero}>
                <ImageBackground source={{uri: 'https://i.postimg.cc/Gh9dNsBW/hero.png'}} style={styles.viewHero}>

                </ImageBackground>
                </View>
                <View style={styles.viewTitle}>
                    <Text></Text>
                </View>
            </ScrollView>
        </View>
    )
}
export default Home

const styles = StyleSheet.create({
    viewContainerHeader:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('screen').height,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#F1F6F7'
    },
    viewHero:{
        width: ' 100%',
        height: 400,
        alignItems:"center",
        justifyContent:"center"
    }
})