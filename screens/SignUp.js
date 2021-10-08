import React, { useState } from "react"
import { StyleSheet, Text, View, TextInput, ScrollView,TouchableOpacity } from "react-native"
import Header from "../components/Header"

const SignUp = (props) => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    eMail: "",
    profilePic: "",
  })

  const changeValueInput = (e, field) => {
    setNewUser({
      ...newUser,
      [field]: e,
    })
  }

  const sendForm=()=>{
      console.log('hola ')
  }

  return (
    <ScrollView>
        <Header {...props} />
      <View style={styles.container}>
        <Text style={styles.title}>REGISTRATE</Text>
        <TextInput
          style={styles.input}
          placeholder=" Nombre"
          value={newUser.firstName}
          onChangeText={(e) => changeValueInput(e, "firstName")}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          value={newUser.lastName}
          onChangeText={(e) => changeValueInput(e, "lastName")}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={newUser.eMail}
          onChangeText={(e) => changeValueInput(e, "eMail")}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={newUser.password}
          onChangeText={(e) => changeValueInput(e, "password")}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          onChangeText={(e) => changeValueInput(e, "check password")}
        />
        <View>
        <TouchableOpacity
            onPress={sendForm}
            style={styles.button}
            activeOpacity={0.7}
          >
            <Text style={styles.text}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'radial-gradient(circle, rgba(47,144,176,1) 0%, rgba(48,106,154,1) 55%, rgba(49,75,136,1) 73%, rgba(49,25,109,1) 100%);'
  },
  title:{
      fontSize:40,
      color:'black',
      backgroundColor:'white',
      padding:15,
      marginTop:15
  },
  input: {
    height: 40,
    width: 230,
    margin: 12,
    padding: 10,
    borderRadius: 2,
    color:'white',
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    backgroundColor: "transparent",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    elevation: 3,
    marginTop: 20,
    backgroundColor: "#2f2f6b",
    width: "100%",
    height: 50,
    zIndex: 1,
    marginBottom:10,
    padding:10
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
})
