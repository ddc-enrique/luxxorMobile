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
  const [errorPassChecked, setErrorPassCkecked] = useState(null)
  const [confirmPass, setConfirmPass] = useState(null)
  const [errorsValidation, setErrorsValidation] = useState({})

  const changeValueInput = (e, field) => {
    setNewUser({
      ...newUser,
      [field]: e,
    })
  }

  const sendForm = async () => {
    
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
         try{
          const resp = await props.signUp(newUser)
           if(!resp.success){
             let err=resp.response
             throw err
           }
           
             showMessage({
             message: 'Bienvenido ',
             type: "success",
             backgroundColor: "#00bb2d",
            });
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
            {!errorsValidation["firstName"] && <Text style={styles.errorPlaceholder}>&nbsp;</Text>}
            {errorsValidation["firstName"] && <Text style={styles.error}>&nbsp;{errorsValidation["firstName"]}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              value={newUser.lastName}
              onChangeText={(e) => changeValueInput(e, "lastName")}
              placeholderTextColor={"white"}
            />
            {!errorsValidation["lastName"] && <Text style={styles.errorPlaceholder}>&nbsp;</Text>}
            {errorsValidation["lastName"] && <Text style={styles.error}>&nbsp;{errorsValidation["lastName"]}</Text>}
            <TextInput
              style={styles.input}
              placeholder="Url de imagen"
              value={newUser.profilePic}
              onChangeText={(e) => changeValueInput(e, "profilePic")}
              placeholderTextColor={"white"}
            />
            {!errorsValidation["profilePic"] && <Text style={styles.errorPlaceholder}>&nbsp;</Text>}
            {errorsValidation["profilePic"] && <Text style={styles.error}>&nbsp;{errorsValidation["profilePic"]}</Text>}
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
            <TextInput
              style={styles.input}
              placeholder="Confirmar contraseña"
              onChangeText={(e) => setConfirmPass(e)}
              onBlur={compareValues}
              placeholderTextColor={"white"}
            />
            <Text style={{color:'red'}}>{errorPassChecked}&nbsp;</Text>
            <View>
              <TouchableOpacity
                onPress={sendForm}
                style={styles.button}
                activeOpacity={0.7}
              >
                <Text style={styles.text}>Registrarme</Text>
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
