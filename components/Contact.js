import React, { useState} from "react";
import { View, TextInput,StyleSheet, Text} from "react-native";
import {showMessage} from "react-native-flash-message";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import messagesActions from "../redux/actions/messagesActions";


const Contact = ({ sendNewMessage }) =>{
    const [newMessage, setNewMessage] = useState({
        authorName: "",
        email: "",
        textMessage: ""
    })
    const [errorsValidation, setErrorsValidation] = useState({})

    // const handleInputText = (e) => {
    //     setNewMessage({
    //         ...newMessage,
    //         [e.target.name]: e.target.value
    //     })
    // }

    const sendMessage = async() => {
        console.log("enviar mensaje")
        console.log(newMessage)
        try {
            let response = await sendNewMessage(newMessage)
            if(response.success) {
                showMessage({
                    "message":"Gracias por su mensaje, estaremos en contacto",
                    "type":"success"
                })
                setErrorsValidation({})
            }
            setNewMessage({
                authorName: "",
                email: "",
                textMessage: ""
            })
        } catch (error) {
            console.log(error)
            if (typeof error === 'string'){
                showMessage({
                    "message":error,
                    "type":"danger"
                })
            } else if (Array.isArray(error)){
                let errors = {};
                error.forEach(err=> {
                    errors[err.path[0]] = err.message;
                })
                setErrorsValidation(errors);
            } else {
                showMessage({
                    "message": "Error de Conexión",
                    "type":"danger"
                })
            }
        }
    }

    return(
        <View style={styles.containerContact}>
            <Text style={styles.textCategories}>
            CONTACTANOS
            </Text>
            <View style={styles.containerInput}>
                <TextInput style={styles.input}  
                    placeholder='Nombre'
                    onChangeText={(newName) => setNewMessage({
                        ...newMessage, authorName: newName
                    })}
                    value={newMessage.authorName}
                    />
                {!errorsValidation["authorName"] && <Text style={styles.errorPlaceholder}>&nbsp;</Text>}
                {errorsValidation["authorName"] && <Text style={styles.error}>&nbsp;{errorsValidation["authorName"]}</Text>}
            </View>
            
            <View style={styles.containerInput}>
                <TextInput style={styles.input}  
                    placeholder='Email' 
                    onChangeText={(newEmail) => setNewMessage({
                        ...newMessage, email: newEmail
                    })}
                    value={newMessage.email}
                    />
                {!errorsValidation["email"] && <Text style={styles.errorPlaceholder}>&nbsp;</Text>}
                {errorsValidation["email"] && <Text style={styles.error}>&nbsp;{errorsValidation["email"]}</Text>}
            </View>

            <View style={styles.containerInput}>
                <TextInput style={styles.input}  
                        placeholder='Mensaje' 
                        multiline={true}
                        numberOfLines={4}
                        onChangeText={(newText) => setNewMessage({
                            ...newMessage, textMessage: newText
                        })}
                        value={newMessage.textMessage}
                /> 
                {!errorsValidation["email"] && <Text style={styles.errorPlaceholder}>&nbsp;</Text>}
                {errorsValidation["email"] && <Text style={styles.error}>&nbsp;{errorsValidation["email"]}</Text>}
            </View>
            
            <TouchableOpacity onPress={()=> sendMessage()}>
                <View style={styles.buttonSend}>
                    <Text style={styles.textButton}>
                        Enviar
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const mapDispatchToProps = {
    sendNewMessage: messagesActions.sendNewMessage,
}

export default connect(null, mapDispatchToProps)(Contact)

const styles = StyleSheet.create({
    containerContact:{
        width: '80%',
        minHeight: 400,
        alignItems: "center",
        marginVertical: 50,
        backgroundColor:'#e5e5e521',
        paddingTop: 50,
        paddingBottom: 30
    },
    containerInput: {
        width:"80%",
    },
    input: {
        width: '100%',
        height: 50,
        // marginVertical: 15,
        fontSize: 20,
        borderBottomWidth: 1,
        borderColor: '#e3e3e3'
    },
    textCategories:{
        fontFamily: 'Spartan_400Regular',
        fontSize: 30,
        textAlign: "center",
        marginVertical:10,
        color:'#545454',
        width: '80%',
        paddingVertical:10,
        backgroundColor: 'white'
    },
    buttonSend:{
        width:100,
        height: 50,
        backgroundColor: '#e3e3e3',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20
    },
    textButton:{
        fontSize: 20,
        fontFamily: 'Spartan_400Regular',
        color:'#545454',
    },
    error:{
        width:"100%",
        // height: 20,
        fontFamily: 'Spartan_400Regular',
        fontSize: 15,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        paddingHorizontal: 4,
        paddingVertical: 5,
        color: "red",
        backgroundColor: "white",
        textAlign: "center",
        marginBottom: 5
    },
    errorPlaceholder:{
        // height: 20,
        width: "100%",    
        fontSize: 15,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        paddingHorizontal: 4,
        paddingVertical: 5,
        // color: "red",
        // backgroundColor: "white",
        // textAlign: "center",
        marginBottom: 5
    }
})