import React,{useEffect} from "react"
import { View,Text, Image, StyleSheet, ImageBackground } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { connect } from "react-redux"
import usersAction from "../redux/actions/usersAction"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {DrawerItem} from "@react-navigation/drawer"

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
    const { token, firstName,profilePic, logOut } = props

    useEffect(() => {
        loginLocalStoreUser()
    }, [])

     const loginLocalStoreUser = async () => {
         if (!props.token && AsyncStorage.getItem("token")) {
           const tokenAsyncStorage = await AsyncStorage.getItem("token")
           if (tokenAsyncStorage) {
             props.signWithLocal(tokenAsyncStorage)
             return null
           }
         }
       }

    return(
        <View style={styles.container1}>
            <ImageBackground source={{uri: 'https://i.postimg.cc/ryjKWhwG/luke-chesser-p-Jad-Qetz-Tk-I-unsplash.jpg'}} style={styles.container1}>
                <View style={styles.container}>
                    {token?
                    <Image source={{uri:profilePic}} style={styles.img}/>
                    :<Image source={{uri: "https://i.postimg.cc/pTZVv7n0/Dise-o-sin-t-tulo-66.png"}} style={styles.img}/>
                    }
                    <Text style={styles.text}>Bienvenido {firstName?firstName:null}!</Text>
                </View>
                <DrawerMenu icon='https://i.postimg.cc/RVjjhd94/home.png' titleName = 'Inicio' navigation={()=>props.navigation.navigate('HomeStack')}/>

                <DrawerMenu  icon='https://i.postimg.cc/ZYL8C5SR/productos.png'  titleName = 'Productos' navigation={()=>props.navigation.navigate('Productos')}/>
                
                {token?
                <View style={{justifyContent: 'center',marginLeft:100}}>
                <DrawerItem {...props} label={({ focused }) => <Text style={{ color:'#e3e3e3',fontFamily: 'Spartan_400Regular',fontSize:25 }}>{focused ? 'Salir' : 'Salir'}</Text>} onPress={() => {logOut()}}/>
                {/* <DrawerMenu  icon='https://i.postimg.cc/q7GnqX9T/user.png'  titleName = 'Salir' onPress={()=>{logOut()}}/> */}
                </View>
                :<>
                <DrawerMenu  icon='https://i.postimg.cc/6pyCHv2V/sign-up.png'  titleName = 'Registrarme' navigation={()=>props.navigation.navigate('Registrarme')}/>
                <DrawerMenu  icon='https://i.postimg.cc/q7GnqX9T/user.png'  titleName = 'Ingresar' navigation={()=>props.navigation.navigate('Ingresar')}/>
                </>
                }
            
                <View  style={styles.container}>
                </View>
            </ImageBackground>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        token:state.users.token,
        firstName:state.users.firstName,
        profilePic:state.users.profilePic
    }
  }
  
  const mapDispatchToProps = {
    signWithLocal:usersAction.signWithLocal,
    logOut:usersAction.logOut
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
        paddingHorizontal: 70
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
    },
    logOutText:{
        color: '#e3e3e3',
        opacity: 0.5,
        fontSize: 80,
        marginVertical:10,
        fontFamily: 'Spartan_400Regular'
    }
})
