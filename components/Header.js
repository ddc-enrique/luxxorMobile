import React from "react";
import { View, Text,StyleSheet, ImageBackground,Image, TouchableOpacity, Dimensions} from "react-native";

const Header = (props) =>{
    return(
            <View style={styles.viewHeader}> 
                <TouchableOpacity onPress={() => {
                        props.navigation.toggleDrawer()
                    }}>
                    <View style={styles.viewMenu}>
                    <ImageBackground source={{uri: 'https://i.postimg.cc/jj31jRt1/Dise-o-sin-t-tulo-59.png'}} style= {styles.viewMenuImage} >
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
            justifyContent:'flex-end',
            alignItems: 'center',
            paddingHorizontal: 15,
            width: Dimensions.get('window').width,
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
    



