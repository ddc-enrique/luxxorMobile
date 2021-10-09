import React,{useState} from "react"
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

const SignIn = (props) => {
  const [newUser, setNewUser] = useState({
    password: "",
    eMail: "",
  })

  const sendForm = () => {
    console.log("hola ")
  }

  const changeValueInput = (e, field) => {
    setNewUser({
      ...newUser,
      [field]: e,
    })
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
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={newUser.password}
          onChangeText={(e) => changeValueInput(e, "password")}
          placeholderTextColor={"white"}
        />
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

export default SignIn

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 190,
  },
  inputsContain:{
    marginVertical:20
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
    fontSize:20
  },
})
