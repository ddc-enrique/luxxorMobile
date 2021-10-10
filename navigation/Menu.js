import React from "react"
import { View,Text, Image, StyleSheet, ImageBackground } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { connect } from "react-redux"
import usersAction from "../redux/actions/usersAction"

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
            <ImageBackground source={{uri: 'https://i.postimg.cc/ryjKWhwG/luke-chesser-p-Jad-Qetz-Tk-I-unsplash.jpg'}} style={styles.container1}>
                <View style={styles.container}>
                    <Image source={{uri: "https://i.postimg.cc/pTZVv7n0/Dise-o-sin-t-tulo-66.png"}} style={styles.img}/>
                    <Text style={styles.text}>
                    Bienvenido!
                    </Text>
                </View>
                <DrawerMenu icon='https://i.postimg.cc/RVjjhd94/home.png' titleName = 'Inicio' navigation={()=>props.navigation.navigate('HomeStack')}/>

                <DrawerMenu  icon='https://i.postimg.cc/QxTjfHdN/produ.png'  titleName = 'Productos' navigation={()=>props.navigation.navigate('Productos')}/>

            <DrawerMenu  icon='https://i.postimg.cc/zB89FGPB/registro.png'  titleName = 'Registrarme' navigation={()=>props.navigation.navigate('Registrarme')}/>
            <DrawerMenu  icon='https://i.postimg.cc/CxDvzVLx/login.png'  titleName = 'Ingresar' navigation={()=>props.navigation.navigate('Ingresar')}/>
                <View  style={styles.container}>
                </View>
            </ImageBackground>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        //token
        token:state.users.token
    }
  }
  
  const mapDispatchToProps = {
    signWithLocal:usersAction.signWithLocal
    //LOGOUT
  }

export default connect(mapStateToProps, mapDispatchToProps)(Menu)

const styles = StyleSheet.create({
    container1:{
        flex:1,
    },
    container:{
        width: '100%',
        height: 300,
        padding: 20,
        justifyContent: 'center',
        alignItems:'center',
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
        color: '#e3e3e3',
        opacity: 0.5,
        fontSize: 25,
        marginVertical:10,
        fontFamily: 'Spartan_400Regular'
    },
    containerNav:{
        width: '100%',
        height: 70 ,
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: 'row',
        paddingHorizontal: 60,
        marginVertical:20
    },
    icon:{
        width: 45,
        height: 45,
        marginRight:10
    },
    hi:{
        fontSize: 40,
        color: 'black',
        opacity: 0.6,
    }
})
