import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import Header from "../components/Header"
import usersAction from "../redux/actions/usersAction"
import { connect } from "react-redux"
import { showMessage } from "react-native-flash-message"

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
    <ScrollView>
      <LinearGradient
        colors={[
          " rgba(47,144,176,1)",
          "rgba(48,106,154,1)",
          "rgba(49,75,136,1)",
          "rgba(49,25,109,1)",
        ]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
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
      </LinearGradient>
    </ScrollView>
  )
}

const mapDispatchToProps = {
  signIn: usersAction.signIn,
}

export default connect(null, mapDispatchToProps)(SignIn)

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 190,
  },
  inputsContain: {
    marginVertical: 20,
  },
  title: {
    fontSize: 40,
    color: "black",
    backgroundColor: "white",
    padding: 15,
    marginTop: 15,
  },
  text: {
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
    width: "100%",
    height: 50,
    zIndex: 1,
    marginBottom: 10,
    padding: 10,
    borderBottomColor: "white",
    borderBottomWidth: 2,
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
})
