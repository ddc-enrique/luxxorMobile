import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
  TextInput
} from "react-native"
import Header from "../components/Header"
import usersAction from "../redux/actions/usersAction"
import { connect } from "react-redux"
import { showMessage, hideMessage } from "react-native-flash-message"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"



const SignIn = (props) => {
  const [newUser, setNewUser] = useState({
    password: "",
    eMail: "",
  })
  const [errorsValidation, setErrorsValidation] = useState({})

  const changeValueInput = (e, field) => {
    setNewUser({
      ...newUser,
      [field]: e,
    })
  }

  const sendForm = async () => {

      if (newUser.eMail === "" || newUser.password === "") {
        showMessage({
          message: "Completa todos los campos",
          type: "warning",
          backgroundColor: "#f80000",
        })
        return false
      } else {
        try{
          const resp = await props.signIn(newUser)
          if(!resp.success){
            let err=resp.response
            throw err
          }

          showMessage({
            message: "Bienvenido ",
            type: "success",
            backgroundColor: "#00bb2d",
          })
          props.navigation.navigate("HomeStack")
        }catch(error){
          if (typeof error === 'string'){
            showMessage({
                "message":error,
                "type":"danger"
            })
          } else if (Array.isArray(error)){
              let errors = {};
              error.forEach(err=> {
                  errors[err.path[0]] = err.message
              })
              setErrorsValidation(errors)
          } else {
              showMessage({
                  "message": "Error de Conexión",
                  "type":"danger"
              })
          }
        }
        
      }

  }

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >  
      <ImageBackground source={{uri: 'https://i.postimg.cc/ryjKWhwG/luke-chesser-p-Jad-Qetz-Tk-I-unsplash.jpg'}} style={styles.container}>
        <ScrollView>
          <Header {...props} />
          <Text style={styles.title}>INICIAR SESION</Text>
          <View style={styles.inputsContain}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={newUser.eMail}
              onChangeText={(e) => changeValueInput(e, "eMail")}
              placeholderTextColor={"white"}
            />
            {!errorsValidation["eMail"] && <Text style={styles.errorPlaceholder}>&nbsp;</Text>}
            {errorsValidation["eMail"] && <Text style={styles.error}>&nbsp;{errorsValidation["eMail"]}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              value={newUser.password}
              onChangeText={(e) => changeValueInput(e, "password")}
              placeholderTextColor={"white"}
            />
            {!errorsValidation["password"] && <Text style={styles.errorPlaceholder}>&nbsp;</Text>}
            {errorsValidation["password"] && <Text style={styles.error}>&nbsp;{errorsValidation["password"]}</Text>}
          </View>
          <View>
            <TouchableOpacity
              onPress={sendForm}
              style={styles.button}
              activeOpacity={0.7}
            >
              <Text style={styles.text}>Iniciar sesion</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAwareScrollView>
  )
}

const mapDispatchToProps = {
  signIn: usersAction.signIn,
}

export default connect(null, mapDispatchToProps)(SignIn)

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  inputsContain: {
    marginVertical: 20,
  },
  title: {
    fontSize: 40,
    color: "#464646",
    backgroundColor: "white",
    padding: 5,
    alignSelf: "center",
    fontFamily: 'Spartan_400Regular'
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  button: {
    alignSelf: "center",
    marginTop: 20,
    width: "40%",
    height: 50,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#e3e3e3'
  },
  textButton:{
    textAlign:"center",
    color: '#464646',
    fontSize:20,
    fontFamily:'Spartan_500Medium',
  },
  input: {
    height: 50,
    width: '60%',
    margin: 12,
    padding: 10,
    color: "white",
    borderBottomColor: "white",
    borderBottomWidth: 1.5,
    fontSize: 20,
    fontFamily:'Spartan_400Regular',
    alignSelf:"center"
  },
  errorPlaceholder:{
    width: "100%",    
    fontSize: 15,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 5,
    marginBottom: 5
    },
  error:{
    width:"75%",
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
  image:{
    marginTop: 100,
    width: '80%',
    height: 400,
    alignSelf: "center"
  }
})
