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
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorPass, setErrorPass] = useState(null)

  const changeValueInput = (e, field) => {
    setNewUser({
      ...newUser,
      [field]: e,
    })
  }

  const sendForm = async () => {
    try {
      if (newUser.eMail === "" || newUser.password === "") {
        showMessage({
          message: "Completa todos los campos",
          type: "warning",
          backgroundColor: "#f80000",
        })
        return false
      } else {
        
        const resp = await props.signIn(newUser)
        if(resp === 'Email y/o contraseña incorrectos'){
          showMessage({
            message: "Email y/o contraseña incorrectos",
            type: "warning",
            backgroundColor: "#f80000",
          })
        } else if (resp) {
          setErrorEmail(
            resp.find((err) => err.path[0] === "eMail")
              ? resp.find((err) => err.path[0] === "eMail").message
              : null
          )
          setErrorPass(
            resp.find((err) => err.path[0] === "password")
              ? resp.find((err) => err.path[0] === "password").message
              : null
          )
        } else {
          showMessage({
            message: "Bienvenido ",
            type: "success",
            backgroundColor: "#00bb2d",
          })
          props.navigation.navigate("HomeStack")
        }
      }
    } catch (error) {
      console.log(error)
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
                <Text style={styles.error}>{errorEmail}&nbsp;</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña"
                  value={newUser.password}
                  onChangeText={(e) => changeValueInput(e, "password")}
                  placeholderTextColor={"white"}
                  secureTextEntry
                />
                <Text style={styles.error}>{errorPass}&nbsp;</Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={sendForm}
                  style={styles.button}
                >
                  <Text style={styles.textButton}>Iniciar sesion</Text>
                </TouchableOpacity>
              </View>
              <Image source={{uri: 'https://i.postimg.cc/VLZbw28G/Alienware-UFO-concept-tablet-removebg-preview.png'}} style={styles.image}/>
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
  error: {
    fontSize: 18,
    color: "black",
    margin: 0,
    fontFamily:'Spartan_500Medium',
    alignSelf:"center"
  },
  image:{
    marginTop: 100,
    width: '80%',
    height: 400,
    alignSelf: "center"
  }
})
