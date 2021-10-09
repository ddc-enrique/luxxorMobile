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
  const [confirmPass,setConfirmPass] = useState(null)
  const [errorProfilePic,setErrorProfilePic] = useState(null)

  const changeValueInput = (e, field) => {
    setNewUser({
      ...newUser,
      [field]: e,
    })
  }

   const sendForm = async () => {
     try {
       if (
         Object.values(newUser).some((value) => value === "") ||newUser.checkPassword === "") {
        //  toast("Completa todos los campos", {
        //    icon: "🚫",
        //    style: {
        //      borderRadius: "1rem",
        //      background: "#fff",
        //      color: "#545454",
        //    },
        //  })
        console.log('completa LaCONCHA DE MADRE')
       }else {
         const resp = await props.signUp(newUser)
         console.log(resp)
        //  if (resp) {
        //    console.log(resp)
        //    setErrorName(
        //      resp.find((err) => err.path[0] === "firstName")
        //        ? resp.find((err) => err.path[0] === "firstName").message
        //        : null
        //    )
        //    setErrorLastName(
        //      resp.find((err) => err.path[0] === "lastName")
        //        ? resp.find((err) => err.path[0] === "lastName").message
        //        : null
        //    )
        //    setErrorEmail(
        //      resp.find((err) => err.path[0] === "eMail")
        //        ? resp.find((err) => err.path[0] === "eMail").message
        //        : null
        //    )

        //    setErrorPass(
        //      resp.find((err) => err.path[0] === "password")
        //        ? resp.find((err) => err.path[0] === "password").message
        //        : null
        //    )
        //  } else {
        //    toast("Welcome", {
        //      icon: "👏",
        //      style: {
        //        borderRadius: "1rem",
        //        background: "#f48f31",
        //        color: "#fff",
        //      },
        //    })
        //    props.history.push("/")
        //  }
       }
     } catch (error) {
       console.log(error)
     }
   }

    const compareValues=()=>{
      if(confirmPass !== newUser.password){
       setErrorPassCkecked('No coinciden... vuelve a intentarlo')
      }else{
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
        />
         <Text style={styles.error}>{errorPass}&nbsp;</Text> 
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          onChangeText={(e) => setConfirmPass(e)}
          onBlur={compareValues}
          placeholderTextColor={"white"}
        />
         <Text style={styles.error}>{errorPassChecked}&nbsp;</Text> 
        <View>
          <TouchableOpacity
            onPress={sendForm}
            style={styles.button}
            activeOpacity={0.7}
          >
            <Text style={styles.text}>Registrarme</Text>
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
    fontSize:20
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
  error:{
      fontSize:15,
      // backgroundColor:'white',
      color:'yellow',
      margin:0,
      paddingHorizontal:5,
      fontWeight: 'bold',
  }
})
