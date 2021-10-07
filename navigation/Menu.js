import React from "react"
import { View,Text, Image, StyleSheet } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

const DrawerMenu =(props) =>{
    return(
        <TouchableOpacity onPress={props.navigation}>
            <View style={styles.containerNav}>
                <Image source={{uri: props.icon}} style={styles.icon} />
                <Text style={styles.text}>{props.titleName}</Text>
            </View>
        </TouchableOpacity>
    )
}
const Menu = (props) =>{
    return(
        <View style={styles.container1}>
            <View style={styles.container}>
                <Image source={{uri: "https://i.postimg.cc/bNJpMVVY/avatar.png"}} style={styles.img}/>
                <Text style={styles.text}>
                Bienvenido!
                </Text>
            </View>
            <DrawerMenu icon='https://i.postimg.cc/1XZWStQ7/house.png' titleName = 'Inicio' navigation={()=>props.navigation.navigate('HomeStack')}/>
            <DrawerMenu  icon='https://i.postimg.cc/VLM8X74X/architecture-and-city.png'  titleName = 'Productos' navigation={()=>props.navigation.navigate('Productos')}/>

        <DrawerMenu  icon='https://i.postimg.cc/6pyCHv2V/sign-up.png'  titleName = 'Registrarme' navigation={()=>props.navigation.navigate('Registrarme')}/>
        <DrawerMenu  icon='https://i.postimg.cc/q7GnqX9T/user.png'  titleName = 'Ingresar' navigation={()=>props.navigation.navigate('Ingresar')}/>
            <View  style={styles.container}>
                <Image source={{uri: 'https://i.postimg.cc/GpQsXM81/Dise-o-sin-t-tulo-41-removebg-preview.png'}} style={styles.img2} />
            </View>
        </View>
    )
}


export default Menu

const styles = StyleSheet.create({
    container1:{
        flex:1,
        backgroundColor: '#F1F6F7'
    },
    container:{
        width: '100%',
        height: 300,
        padding: 20,
        justifyContent: 'center',
        alignItems:'center',
        borderBottomWidth: 1.5,
        borderColor: '#1d1d1d65',
        
    },
    img:{
        width: 150,
        height: 150,
        borderRadius: 100
    },
    img2:{
        width: 150,
        height: 150,
    },
    text:{
        color: 'black',
        opacity: 0.6,
        fontSize: 25,
        marginVertical:10
    },
    containerNav:{
        width: '100%',
        height: 70 ,
        justifyContent: 'center',
        alignItems:'center',
        flexDirection: 'row',
    },
    icon:{
        width: 35,
        height: 35,
        marginRight:10
    },
    hi:{
        fontSize: 40,
        color: 'black',
        opacity: 0.6,
    }
})
