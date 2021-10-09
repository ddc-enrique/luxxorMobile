import { Text, View, StyleSheet,ScrollView, ImageBackground } from "react-native"
import React from 'react';
import Header from "../components/Header";
import Novedades from "../components/Novedades"
import Contact from "../components/Contact";
import SectionInfo from '../components/SectionInfo'



const Home = (props)=>{
    return(
        <View style={styles.viewContainerHome}>
            <ImageBackground source={{uri: 'https://i.postimg.cc/ryjKWhwG/luke-chesser-p-Jad-Qetz-Tk-I-unsplash.jpg'}} style={styles.viewContainerHome}>
            <ScrollView>
                    <View style={styles.viewContainer}>
                        <Header {...props}/>
                        <View style={styles.viewHero}>
                            <ImageBackground source={{uri: 'https://i.postimg.cc/Jhmptvkj/1000x1000-1-removebg-preview-1.png'}}  style={styles.viewImgHero}>
                            </ImageBackground>
                            <Text style={styles.titleHome} >
                                Luxxor
                            </Text>
                    </View>
                    <Novedades/>
                    <SectionInfo/>
                    <Contact/>
                    </View>
            </ScrollView>
            </ImageBackground>
        </View>
    )
}
export default Home

const styles = StyleSheet.create({
    viewContainerHome:{
        flex: 1
    },
    viewContainer:{
        width: "100%",
        minHeight:500,
        flexDirection: 'column',
        justifyContent: "space-between",
        alignItems: "center",
    },
    viewHero:{
        width: ' 100%',
        minHeight: 860,
        alignItems:"center",
        justifyContent:"center",
        marginBottom: 40
    },
    titleHome:{
        fontFamily: 'Spartan_700Bold',
        fontSize: 130,
        color: '#e3e3e3'
    },
    viewImgHero:{
        width: 300,
        height: 300,
        position: "absolute",
        zIndex: 1,
        bottom: 250
    },
    
})