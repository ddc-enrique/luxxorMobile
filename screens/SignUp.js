import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import Header from "../components/Header"
import { LinearGradient } from "expo-linear-gradient"
import usersAction from "../redux/actions/usersAction"
import { connect } from "react-redux"
import { showMessage, hideMessage } from "react-native-flash-message"

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
      setErrorPassCkecked("No coinciden... vuelve a intentarlo")
    } else {
      setErrorPassCkecked(null)
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
        <View style={{marginVertical:10,alignItems:'center'}}>
            <Text style={{fontSize:20,color:'white',fontFamily: 'Spartan_400Regular',}}>Tienes cuenta?</Text>
            <TouchableOpacity onPress={()=> props.navigation.navigate('Ingresar')}>
              <Text style={{fontSize:20,color:'white',fontFamily: 'Spartan_400Regular',marginVertical:7,fontWeight:'bold'}}>Click aqui</Text>
            </TouchableOpacity>
        </View>
        
      </LinearGradient>
    </ScrollView>
  )
}

const mapDispatchToProps = {
  signUp: usersAction.signUp,
}

export default connect(null, mapDispatchToProps)(SignUp)

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  title: {
    fontSize: 40,
    color: "black",
    backgroundColor: "white",
    padding: 15,
    marginTop: 0,
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
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
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
