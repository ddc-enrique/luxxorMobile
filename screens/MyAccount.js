import React, { useState, useEffect } from "react"
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
import { showMessage } from "react-native-flash-message"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"


const MyAccount = (props) => {
    const { dni , id, getData, token, firstName, lastName, editDataUser } = props
    const [view, setView] = useState(true)
    
    let completeAccount = !isNaN(dni)
    let initialDataUser = completeAccount ? { firstName: "", lastName: "", city: "", zipCode: "", address: "", optional: "", phone: "" }
        : { dni: null, city: "", zipCode: "", address: "", optional: "", phone: "" } 
    const [dataUser, setDataUser] = useState(initialDataUser)
    const [errorsValidation, setErrorsValidation] = useState({})
    const[loading,setLoading]=useState(true)


    useEffect( () => {
        const getDataUser = async () => {
            try{
                let extraData = await getData(id, token)                
                setDataUser( {...extraData, firstName, lastName } )
            } catch(err) {
                showMessage({
                    "message":err.message,
                    "type":"danger"
                })
            }
        }
        if(completeAccount) getDataUser()
        // setTimeout(()=>{
            setLoading(!loading)  
        // },500)
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const inputHandler = e => {
        setDataUser({ ...dataUser, [e.target.name]: e.target.value})
    }

    const keyPressHandler = e => {
        if(e.key === "Enter") updateDataUser()
    }

    const updateDataUser = async (e) => {
        e.preventDefault()
        try{
            let response = await editDataUser(id, completeAccount, token, dataUser)
            console.log(response)
            if(response.success){ 
                if(!completeAccount){
                    showMessage({
                        "message":"Datos Actualizados con éxito ya puedes comprar",
                        "type": "success"
                    })
                    completeAccount = true
                } else {
                    showMessage({
                        "message":"Datos Actualizados con éxito",
                        "type": "success"
                    })
                }
            }
        } catch(error) {
            if (typeof error === 'string' || error === "DNI en uso"){
            } else if (Array.isArray(error)){
                let errors = {};
                error.forEach(err=> {
                    errors[err.path[0]] = err.message;
                })
                setErrorsValidation(errors);
            } else {
                showMessage({
                    "message":"Error de Conexión",
                    "type": "danger"
                })
            }
        }
    }


    return (
        <KeyboardAwareScrollView
            // style={{ backgroundColor: '#4c69a5' }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}
        >
            <ImageBackground source={{uri: 'https://i.postimg.cc/ryjKWhwG/luke-chesser-p-Jad-Qetz-Tk-I-unsplash.jpg'}} style={styles.viewContainerHome}>
                <View>
                    <Header {...props} />
                    <View>
                        <Text style={styles.title}>
                            {!view ? "Historial de compras" : completeAccount ? 
                                "Puedes editar estos datos de tu cuenta" : "Completa tus datos para poder comprar"}
                        </Text>
                        <TouchableOpacity style={styles.menu}>
                            <Text style={styles.textMenu} onPress={()=>setView(false)}>Mis compras</Text>
                            <Text style={styles.textMenu} onPress={()=>setView(true)}>Mis datos</Text>
                        </TouchableOpacity>
                        {view ?
                        
                            <View style={styles.inputToEdit}>
                                {!completeAccount &&
                                <View>
                                    <Text style={styles.label}>DNI</Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="ej 44444444"
                                        // defaultValue={dataUser.firstName}
                                        onChangeText={inputHandler}
                                        placeholderTextColor={"white"}
                                        keyboardType={"numeric"}
                                    
                                    />
                                </View>}                        
                                {completeAccount &&
                                <View>
                                    <Text style={styles.label}>Nombre: </Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="ej Juan"
                                        defaultValue={dataUser.firstName}
                                        onChangeText={inputHandler}
                                        placeholderTextColor={"white"}
                                    />
                                </View>}
                                {completeAccount &&
                                <View>
                                    <Text style={styles.label}>Apellido: </Text>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="ej Garcia"
                                        defaultValue={dataUser.lastName}
                                        onChangeText={inputHandler}
                                        placeholderTextColor={"white"}
                                    />
                                </View>}
                                <View>
                                    {completeAccount && <Text style={styles.label}>Teléfono: </Text>}
                                    <TextInput
                                        style={styles.input}
                                        placeholder={!completeAccount ? "Teléfono" : "ej 114587427"}
                                        defaultValue={dataUser.phone.toString()}
                                        onChangeText={inputHandler}
                                        placeholderTextColor={"white"}
                                        keyboardType={"numeric"}
                                    />
                                </View>
                                <View>
                                    {completeAccount && <Text style={styles.label}>Ciudad: </Text>}
                                    <TextInput
                                        style={styles.input}
                                        placeholder={!completeAccount ? "Ciudad" : "ej Maipu, Mendoza"}
                                        defaultValue={dataUser.city}
                                        onChangeText={inputHandler}
                                        placeholderTextColor={"white"}
                                    />
                                </View>
                                <View>
                                    {completeAccount && <Text style={styles.label}>Código Postal: </Text>}
                                    <TextInput
                                        style={styles.input}
                                        placeholder={!completeAccount ? "Código postal" : "ej 5501"}
                                        defaultValue={dataUser.zipCode.toString()}
                                        onChangeText={inputHandler}
                                        placeholderTextColor={"white"}
                                        keyboardType={"numeric"}
                                    />
                                </View>
                                <View>
                                    {completeAccount && <Text style={styles.label}>Dirección: </Text>}
                                    <TextInput
                                        style={styles.input}
                                        placeholder={!completeAccount ? "Dirección" : "ej Salta 1234"}
                                        defaultValue={dataUser.address}
                                        onChangeText={inputHandler}
                                        placeholderTextColor={"white"}
                                    />
                                </View>
                                <View>
                                    {completeAccount && <Text style={styles.label}>Opcional: </Text>}
                                    <TextInput
                                        style={styles.input}
                                        placeholder={!completeAccount ? "Opcional" : "ej casa o depto/piso"}
                                        defaultValue={dataUser.optional}
                                        onChangeText={inputHandler}
                                        placeholderTextColor={"white"}
                                    />
                                </View>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.textButton}>{completeAccount ? "Editar" : "Enviar!"}</Text>
                                </TouchableOpacity>
                            </View>
                            : <UserPurchase id={props.id}/>}
                    </View>
                    
                </View>
            </ImageBackground>
        </KeyboardAwareScrollView>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.users.token,
        id: state.users.id,
        dni: state.users.dni
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