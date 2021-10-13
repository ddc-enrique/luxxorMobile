import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions
} from "react-native"
import Header from "../components/Header"
import { connect } from "react-redux"
import usersAction from "../redux/actions/usersAction"
import UserPurchase from "../components/UserPurchase"


const MyAccount = (props) => {

    const [view, setView] = useState(true)
    const [dataUser, setDataUser] = useState({
        firstName: "",
        lastName: "",
        city: "",
        zipCode: "", 
        address: "", 
        optional: "", 
        phone: ""
    })

    const handleInput = (e) => {

    }


    return (
        <ImageBackground source={{uri: 'https://i.postimg.cc/ryjKWhwG/luke-chesser-p-Jad-Qetz-Tk-I-unsplash.jpg'}} style={styles.viewContainerHome}>
            <View>
                <Header {...props} />
                <View>
                    <Text style={styles.title}>{view ? "Puedes editar estos datos de tu cuenta" : "Historial de compras"}</Text>
                    <TouchableOpacity style={styles.menu}>
                        <Text style={styles.textMenu} onPress={()=>setView(false)}>Mis compras</Text>
                        <Text style={styles.textMenu} onPress={()=>setView(true)}>Mis datos</Text>
                    </TouchableOpacity>
                    {view ?
                    <View style={styles.inputToEdit}>
                        <TextInput 
                            style={styles.input}
                            placeholder="Nombre"
                            defaultValue={dataUser.firstName}
                            onChangeText={handleInput}
                            placeholderTextColor={"white"}
                        />
                        <TextInput 
                            style={styles.input}
                            placeholder="Apellido"
                            defaultValue={dataUser.lastName}
                            onChangeText={handleInput}
                            placeholderTextColor={"white"}
                        />
                        <TextInput 
                            style={styles.input}
                            placeholder="Teléfono"
                            defaultValue={dataUser.city}
                            onChangeText={handleInput}
                            placeholderTextColor={"white"}
                        />
                        <TextInput 
                            style={styles.input}
                            placeholder="Ciudad"
                            defaultValue={dataUser.zipCode}
                            onChangeText={handleInput}
                            placeholderTextColor={"white"}
                        />
                        <TextInput 
                            style={styles.input}
                            placeholder="Código postal"
                            defaultValue={dataUser.address}
                            onChangeText={handleInput}
                            placeholderTextColor={"white"}
                        />
                        <TextInput 
                            style={styles.input}
                            placeholder="Dirección"
                            defaultValue={dataUser.city}
                            onChangeText={handleInput}
                            placeholderTextColor={"white"}
                        />
                        <TextInput 
                            style={styles.input}
                            placeholder="Opcional"
                            defaultValue={dataUser.optional}
                            onChangeText={handleInput}
                            placeholderTextColor={"white"}
                        />
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.textButton}>Actualizar</Text>
                        </TouchableOpacity>
                    </View> :
                    <UserPurchase id={props.id}/>}
                </View>
                

            </View>
        </ImageBackground>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.users.token,
        id: state.users.id,
    }
}

const mapDispatchToProps = {
    getData: usersAction.getUserData,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)

const styles = StyleSheet.create({
    viewContainerHome:{
        flex: 1
      },

    title: {
        textAlign: "center",
        justifyContent: "center",
        fontFamily: 'Spartan_400Regular',
        fontSize: 22,
        color:'#e3e3e3',
        marginBottom: "8%"
    },

    inputToEdit: {
        justifyContent: "center",
        alignItems: "center"
    },

    menu:{
        flexDirection: "row",
        justifyContent: "center",
    },
    
    textMenu: {
        marginLeft: 15,
        color: "white",
        fontSize: 20
    },

    input: {
        height: 40,
        width: 240,
        margin: 12,
        padding: 10,
        borderRadius: 2,
        color: "white",
        borderBottomColor: "white",
        borderBottomWidth: 2,
        backgroundColor: "transparent",
        fontSize: 20,
      },
    
    textButton: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
    },

    button: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        elevation: 3,
        marginTop: 20,
        backgroundColor: "transparent",
        width: "50%",
        height: 50,
        zIndex: 1,
        marginBottom: 10,
        padding: 10,
        borderBottomColor: "white",
        borderBottomWidth: 2,
      },

})