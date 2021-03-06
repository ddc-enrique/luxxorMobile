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
  Dimensions,
  ScrollView
} from "react-native"
import Header from "../components/Header"
import { connect } from "react-redux"
import usersAction from "../redux/actions/usersAction"
import UserPurchase from "../components/UserPurchase"
import { showMessage } from "react-native-flash-message"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"


const MyAccount = (props) => {
    const { dni , id, getData, token, firstName, lastName, editDataUser } = props
    const [completeAccount, setCompletAccount] = useState(dni>0)
    const [view, setView] = useState(true)
    console.log(dni)

    let initialDataUser = completeAccount ? { firstName: "", lastName: "", city: "", zipCode: "", address: "", optional: "", phone: "" }
        : { dni: null, city: "", zipCode: "", address: "", optional: "", phone: "", firstName, lastName } 
    const [dataUser, setDataUser] = useState(initialDataUser)
    const [errorsValidation, setErrorsValidation] = useState({})
    const [loading,setLoading]=useState(true)
    const [loadingPurchase, setLoadingPurchase] = useState(true)


    useEffect( () => {
        const getDataUser = async () => {
            try{
                let extraData = await getData(id, token)
                console.log(extraData)
                if(completeAccount) extraData.zipCode = extraData.zipCode.toString()
                console.log(extraData)
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

    // const setDataUser = (text, flagNumber) => {
    //     setDataUser({ ...dataUser, [e.target.name]: e.target.value})
    // }

    // const keyPressHandler = e => {
    //     if(e.key === "Enter") updateDataUser()
    // }

    const updateDataUser = async () => {
        try{
            let response = await editDataUser(id, completeAccount, token, dataUser)
            if(response.success){ 
                if(!completeAccount){
                    showMessage({
                        "message":"Datos Actualizados con ??xito ya puedes comprar",
                        "type": "success"
                    })
                    setCompletAccount(true)
                } else {
                    showMessage({
                        "message":"Datos Actualizados con ??xito",
                        "type": "success"
                    })
                }
            }
        } catch(error) {
            console.log(error)
            if (typeof error === 'string' || error === "DNI en uso"){
                showMessage({
                    "message": error,
                    "type": "danger"
                })
            } else if (Array.isArray(error)){
                let errors = {};
                error.forEach(err=> {
                    errors[err.path[0]] = err.message;
                })
                setErrorsValidation(errors);
            } else {
                showMessage({
                    "message":"Error de Conexi??n",
                    "type": "danger"
                })
            }
        }
    }

    if(loading){
        return( 
          <ImageBackground source={{uri: 'https://i.postimg.cc/ryjKWhwG/luke-chesser-p-Jad-Qetz-Tk-I-unsplash.jpg'}} style={{flex: 1 , justifyContent: 'center', alignItems: 'center'}}>
            <Image source={{uri: 'https://i.postimg.cc/TwZG2QWc/loading.gif'}} style={{width: 200 , height: 200}} />
        </ImageBackground>)
    }

    return (
    <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.viewContainerHome}
        scrollEnabled={false}
    >
        <ScrollView>
                <ImageBackground source={{uri: 'https://i.postimg.cc/ryjKWhwG/luke-chesser-p-Jad-Qetz-Tk-I-unsplash.jpg'}} style={styles.viewContainerHome}>
                    <View style={styles.viewContainerHome}>
                        <Header {...props} />
                        <View >
                            <Text style={styles.title}>
                                {!view ? "Historial de compras" : completeAccount ? 
                                    "Puedes editar estos datos de tu cuenta" : "Completa tus datos para poder comprar"}
                            </Text>
                            <TouchableOpacity style={styles.menu}>
                                <Text style={!view ? styles.textMenuV : styles.textMenu} onPress={()=>setView(false)}>Mis compras</Text>
                                <Text style={view ? styles.textMenuV : styles.textMenu} onPress={()=>setView(true)}>Mis datos</Text>
                            </TouchableOpacity>
                            {view ?
                            
                                <View style={styles.inputToEdit}>
                                    {!completeAccount &&
                                    <View style={completeAccount ? styles.inputText : styles.inputTextIncomplete}>
                                        {/* <Text style={styles.label}>DNI</Text> */}
                                            <View style={styles.inputContainer}>
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder="DNI"
                                                    // defaultValue={completeAccount ? dataUser.firstName : ''}
                                                    onChangeText={(newDNI) => setDataUser({
                                                        ...dataUser, dni: parseInt(newDNI)
                                                    })}
                                                    placeholderTextColor={"white"}
                                                    keyboardType={"numeric"}                                        
                                                />
                                                {!errorsValidation["dni"] && <Text style={styles.errorPlaceholder}>&nbsp;</Text>}
                                                {errorsValidation["dni"] && <Text style={styles.error}>&nbsp;{errorsValidation["dni"]}</Text>}
                                            </View>
                                    </View>}                        
                                    {completeAccount &&
                                    <View style={completeAccount ? styles.inputText : styles.inputTextIncomplete}>
                                        <Text style={styles.label}>Nombre: </Text>
                                        <View style={styles.inputContainer}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="ej Juan"
                                                defaultValue={completeAccount ? dataUser.firstName : ''}
                                                onChangeText={(newFirstName) => setDataUser({
                                                    ...dataUser, firstName: newFirstName
                                                })}
                                                placeholderTextColor={"white"}
                                            />
                                            {!errorsValidation["firstName"] && <Text style={styles.errorPlaceholder}>&nbsp;</Text>}
                                            {errorsValidation["firstName"] && <Text style={styles.error}>&nbsp;{errorsValidation["firstName"]}</Text>}
                                        </View>
                                    </View>}
                                    {completeAccount &&
                                    <View style={completeAccount ? styles.inputText : styles.inputTextIncomplete}>
                                        <Text style={styles.label}>Apellido: </Text>
                                        <View style={styles.inputContainer}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="ej Garcia"
                                                defaultValue={completeAccount ? dataUser.lastName : ''}
                                                onChangeText={(newLastName) => setDataUser({
                                                    ...dataUser, lastName: newLastName
                                                })}
                                                placeholderTextColor={"white"}
                                            />
                                            {!errorsValidation["lastName"] && <Text style={styles.errorPlaceholder}>&nbsp;</Text>}
                                            {errorsValidation["lastName"] && <Text style={styles.error}>&nbsp;{errorsValidation["lastName"]}</Text>}
                                        </View>
                                    </View>}
                                    <View style={completeAccount ? styles.inputText : styles.inputTextIncomplete}>
                                        {completeAccount && <Text style={styles.label}>Tel??fono: </Text>}
                                        <View style={styles.inputContainer}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder={!completeAccount ? "Tel??fono" : "ej 114587427"}
                                                defaultValue={completeAccount ? dataUser.phone : ''}
                                                onChangeText={(newPhone) => setDataUser({
                                                    ...dataUser, phone: newPhone
                                                })}
                                                placeholderTextColor={"white"}
                                                keyboardType={"numeric"}
                                            />
                                            {!errorsValidation["phone"] && <Text style={styles.errorPlaceholder}>&nbsp;</Text>}
                                            {errorsValidation["phone"] && <Text style={styles.error}>&nbsp;{errorsValidation["phone"]}</Text>}
                                        </View>
                                    </View>
                                    <View style={completeAccount ? styles.inputText : styles.inputTextIncomplete}>
                                        {completeAccount && <Text style={styles.label}>Ciudad: </Text>}
                                        <View style={styles.inputContainer}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder={!completeAccount ? "Ciudad" : "ej Maipu, Mendoza"}
                                                defaultValue={completeAccount ? dataUser.city : ''}
                                                onChangeText={(newCity) => setDataUser({
                                                    ...dataUser, city: newCity
                                                })}
                                                placeholderTextColor={"white"}
                                            />
                                            {!errorsValidation["city"] && <Text style={styles.errorPlaceholder}>&nbsp;</Text>}
                                            {errorsValidation["city"] && <Text style={styles.error}>&nbsp;{errorsValidation["city"]}</Text>}
                                        </View>
                                    </View>
                                    <View style={completeAccount ? styles.inputText : styles.inputTextIncomplete}>
                                        {completeAccount && <Text style={styles.label}>Cod Postal: </Text>}
                                        <View style={completeAccount ? styles.inputContainerZC : styles.inputContainer}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder={!completeAccount ? "C??digo postal" : "ej 5501"}
                                                defaultValue={completeAccount ? dataUser.zipCode : ''}
                                                onChangeText={(newZipCode) => setDataUser({
                                                    ...dataUser, zipCode: parseInt(newZipCode)
                                                })}
                                                placeholderTextColor={"white"}
                                                keyboardType={"numeric"}
                                            />
                                            {!errorsValidation["zipCode"] && <Text style={styles.errorPlaceholder}>&nbsp;</Text>}
                                            {errorsValidation["zipCode"] && <Text style={styles.error}>&nbsp;{errorsValidation["zipCode"]}</Text>}
                                        </View>
                                    </View>
                                    <View style={completeAccount ? styles.inputText : styles.inputTextIncomplete}>
                                        {completeAccount && <Text style={styles.label}>Direcci??n: </Text>}
                                            <View style={styles.inputContainer}>
                                                <TextInput
                                                    style={styles.input}
                                                    placeholder={!completeAccount ? "Direcci??n" : "ej Salta 1234"}
                                                    defaultValue={completeAccount ? dataUser.address : ''}
                                                    onChangeText={(newAddress) => setDataUser({
                                                        ...dataUser, address: newAddress
                                                    })}
                                                    placeholderTextColor={"white"}
                                                />
                                                {!errorsValidation["address"] && <Text style={styles.errorPlaceholder}>&nbsp;</Text>}
                                                {errorsValidation["address"] && <Text style={styles.error}>&nbsp;{errorsValidation["address"]}</Text>}
                                            </View>
                                    </View>
                                    <View style={completeAccount ? styles.inputText : styles.inputTextIncomplete}>
                                        {completeAccount && <Text style={styles.label}>Opcional: </Text>}
                                        <View style={styles.inputContainer}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder={!completeAccount ? "Opcional" : "ej casa o depto/piso"}
                                                defaultValue={completeAccount ? dataUser.optional : ''}
                                                onChangeText={(newOptional) => setDataUser({
                                                    ...dataUser, optional: newOptional
                                                })}
                                                placeholderTextColor={"white"}
                                            />
                                            {!errorsValidation["optional"] && <Text style={styles.errorPlaceholder}>&nbsp;</Text>}
                                            {errorsValidation["optional"] && <Text style={styles.error}>&nbsp;{errorsValidation["optional"]}</Text>}
                                            </View>
                                    </View>
                                    <TouchableOpacity 
                                        onPress={updateDataUser}
                                        style={styles.button}
                                    >
                                        <Text style={styles.textButton}>{completeAccount ? "Editar" : "Enviar!"}</Text>
                                    </TouchableOpacity>
                                </View>
                                : <UserPurchase id={props.id} setLoadingPurchase={setLoadingPurchase} loadingPurchase={loadingPurchase}/>}
                        </View>
                        {(view && loadingPurchase) && <Image source={{uri: 'https://i.postimg.cc/0yLGwPx4/d-removebg-preview.png' }} style={{width: '76%' , height: 200 , alignSelf: 'center', marginVertical:50}}/>}
                    </View>
                </ImageBackground>
        </ScrollView>
    </KeyboardAwareScrollView>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.users.token,
        id: state.users.id,
        dni: state.users.dni,
        firstName: state.users.firstName,
        lastName: state.users.lastName
    }
}

const mapDispatchToProps = {
    getData: usersAction.getUserData,
    editDataUser: usersAction.editDataUser
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
        width: '100%',
        alignItems: "center",
        // backgroundColor: "red",
        // marginLeft: "2%"
    },

    inputText:{
        flexDirection: 'row',
        width: '90%', 
        alignItems: "center",
        justifyContent: "space-between", 
        alignSelf: "flex-start",
        marginLeft: "5%",
        // backgroundColor:"red"
    },

    inputTextIncomplete: {
        flexDirection: 'row',
        width: '100%', 
        alignItems: "center",
        justifyContent: "space-between", 
        marginLeft: "30%",
    },

    inputContainer: {
        width: "70%",
        // backgroundColor: "red",
        marginRight: "5%"
    },

    inputContainerZC:{
        width: "65%",
        marginRight:"10%"
    },

    input: {
        // backgroundColor:"red",
        height: 30,
        width: "100%",
        marginTop: 25,
        color: "white",
        borderBottomColor: "white",
        borderBottomWidth: 1,
        fontSize: 20,
        paddingHorizontal:15
    },

    menu:{
        flexDirection: "row",
        justifyContent: "center",
    },
    
    textMenuV: {
        marginLeft: 15,
        color: "white",
        fontSize: 20,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "white",
    },

    textMenu: {
        marginLeft: 15,
        color: "white",
        fontSize: 20
    },
    
    textButton: {
        fontSize: 20,
        lineHeight: 21,
        fontFamily: 'Spartan_500Medium',
        color: "#464646",
    },

    button: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "#e3e3e3",
        width: "40%",
        height: 50,
        marginBottom: 10,
        padding: 10
    },
    error:{
        width:"100%",
        fontFamily: 'Spartan_400Regular',
        fontSize: 15,
        paddingHorizontal: 4,
        paddingVertical: 5,
        color: "red",
        backgroundColor: "white",
        textAlign: "center",
        marginBottom: 5
    },
    errorPlaceholder:{
        width: "100%",    
        fontSize: 15,
        paddingHorizontal: 4,
        paddingVertical: 5,
        marginBottom: 5
    },
    label:{
        fontSize: 20,
        color: '#1B1B1B',
        fontFamily: 'Spartan_500Medium'
    },

})