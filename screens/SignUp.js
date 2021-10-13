import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ImageBackground
} from "react-native"
import Header from "../components/Header"
import usersAction from "../redux/actions/usersAction"
import { connect } from "react-redux"
import { showMessage, hideMessage } from "react-native-flash-message"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

const SignUp = (props) => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    eMail: "",
    profilePic: "",
  })
  const [errorName, setErrorName] = useState(null)
  const [errorLastName, setErrorLastName] = useState(null)
  const [errorEmail, setErrorEmail] = useState(null)
  const [errorPass, setErrorPass] = useState(null)
  const [errorPassChecked, setErrorPassCkecked] = useState(null)
  const [confirmPass, setConfirmPass] = useState(null)
  const [errorProfilePic, setErrorProfilePic] = useState(null)

  const changeValueInput = (e, field) => {
    setNewUser({
      ...newUser,
      [field]: e,
    })
  }

  const sendForm = async () => {
    try {
      if (
        Object.values(newUser).some((value) => value === "") ||
        confirmPass === ""
      ) {
        showMessage({
          message: 'Completa todos los campos',
          type: "warning",
          backgroundColor: "#f80000",
        });
      } else {
        const resp = await props.signUp(newUser)
        if (resp) {
          setErrorName(
            resp.find((err) => err.path[0] === "firstName")
              ? resp.find((err) => err.path[0] === "firstName").message
              : null
          )
          setErrorLastName(
            resp.find((err) => err.path[0] === "lastName")
              ? resp.find((err) => err.path[0] === "lastName").message
              : null
          )
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
          setErrorProfilePic(
            resp.find((err) => err.path[0] === "profilePic")
              ? resp.find((err) => err.path[0] === "profilePic").message
              : null
          )
        } else {
          showMessage({
            message: 'Bienvenido ',
            type: "success",
            backgroundColor: "#00bb2d",
            });
          props.navigation.navigate("HomeStack")
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const compareValues = () => {
    if (confirmPass !== newUser.password) {
      setErrorPassCkecked("Las contraseñas deben coincidir")
    } else {
      setErrorPassCkecked(null)
    }
  }

  return (
    <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.viewContainerHome}
            scrollEnabled={false}
        >
        <View style={styles.viewContainerHome}>
              <ImageBackground source={{uri: 'https://i.postimg.cc/ryjKWhwG/luke-chesser-p-Jad-Qetz-Tk-I-unsplash.jpg'}} style={styles.viewContainerHome}>
              <ScrollView>
              <Header {...props} />
              <Text style={styles.title}>REGISTRATE</Text>
              <TextInput
                style={styles.input}
                placeholder=" Nombre"
                value={newUser.firstName}
                onChangeText={(e) => changeValueInput(e, "firstName")}
                placeholderTextColor={"white"}
              />
              <Text style={styles.error}>{errorName}&nbsp;</Text>
              <TextInput
                style={styles.input}
                placeholder="Apellido"
                value={newUser.lastName}
                onChangeText={(e) => changeValueInput(e, "lastName")}
                placeholderTextColor={"white"}
              />
              <Text style={styles.error}>{errorLastName}&nbsp;</Text>
              <TextInput
                style={styles.input}
                placeholder="Url de imagen"
                value={newUser.profilePic}
                onChangeText={(e) => changeValueInput(e, "profilePic")}
                placeholderTextColor={"white"}
              />
              <Text style={styles.error}>{errorProfilePic}&nbsp;</Text>
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
              <TextInput
                style={styles.input}
                placeholder="Confirmar contraseña"
                onChangeText={(e) => setConfirmPass(e)}
                onBlur={compareValues}
                placeholderTextColor={"white"}
                secureTextEntry
              />
              <Text style={styles.error}>{errorPassChecked}&nbsp;</Text>
              <View>
                <TouchableOpacity
                  onPress={sendForm}
                  style={styles.button}
                >
                  <Text style={styles.textButton}>Registrarme</Text>
                </TouchableOpacity>
              </View>
              <View style={{marginVertical:10,alignItems:'center'}}>
                  <Text style={{fontSize:20,color:'white',fontFamily: 'Spartan_400Regular',}}>Tienes cuenta?</Text>
                  <TouchableOpacity onPress={()=> props.navigation.navigate('Ingresar')}>
                    <Text style={{fontSize:20,color:'white',fontFamily: 'Spartan_400Regular',marginVertical:7,fontWeight:'bold'}}>Click aqui</Text>
                  </TouchableOpacity>
              </View>
              
            </ScrollView>
              </ImageBackground>
        </View>
    </KeyboardAwareScrollView>
  )
}

const mapDispatchToProps = {
  signUp: usersAction.signUp,
}

export default connect(null, mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({
  viewContainerHome:{
    flex: 1,

},
  title: {
    fontSize: 40,
    color: "#464646",
    backgroundColor:'#e3e3e3',
    padding: 15,
    marginTop: 0,
    fontFamily:'Spartan_400Regular',
    textAlign:"center",
    alignSelf:"center"
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
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    fontFamily:'Spartan_400Regular',
  },
  error: {
    fontSize: 18,
    color: "black",
    margin: 0,
    fontFamily:'Spartan_500Medium',
    alignSelf:"center"
  },
})
