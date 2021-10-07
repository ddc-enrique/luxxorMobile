import React from "react";
import { View, Text,StyleSheet, ImageBackground,Image, TouchableOpacity, Dimensions} from "react-native";

const Header = (props) =>{
    return(
            <View style={styles.viewHeader}> 
                <Image source={{uri :'https://i.postimg.cc/fTBDVNKz/LUXXOR-unscreen.gif'}}  style={styles.logo}/>
                <TouchableOpacity onPress={() => {
                        props.navigation.toggleDrawer()
                    }}>
                    <View style={styles.viewMenu}>
                    <ImageBackground source={{uri: 'https://i.postimg.cc/R0X4cphc/menu_(1).png'}} style= {styles.viewMenuImage} >
                    </ImageBackground>
                    </View>
                </TouchableOpacity>
            </View>  
        )
    }
    export default Header
    
    const styles = StyleSheet.create({
        viewHeader:{
            flexDirection:'row',
            height: 150,
            justifyContent:'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            width: Dimensions.get('window').width,
        },
        logo:{
            width: 250,
            height: 250,
        },
        nav: {
            width: 80,
            height: 80,
        },     
        viewMenuImage:{
            width: 80,
            height: 80,
        },
    })
    



