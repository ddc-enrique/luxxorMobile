import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import Header from "../components/Header"

const ShoppingCart = (props) => {
  

 
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
        <Text style={styles.title}>Carrito de compras</Text>
        <View style={styles.inputsContain}>
          <Text style={styles.textt}>PRODUCTOS</Text>
          <Text style={styles.textt}>SUBTOTAL</Text>
        </View>
        <View>
          <Text>DIV DE PRODUCTOS </Text>
        </View>
        <View style={{ alignItems: "center", marginVertical: 10 }}>
          <View style={styles.btnAdd}>
            <TouchableOpacity>
              <Text style={{ color: "white", fontSize: 20 }}>
                Agregar mas productos
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View>
            <Text>Subtotal (sin envio):</Text>
            <Text>$975</Text>
          </View>
          <View>
            <Text>15%OFF</Text>
            <Text>$42.330</Text>
          </View>
        </View>
        <View>
          <Text>Seleccione una forma de entrega:</Text>
        </View>
      </LinearGradient>
    </ScrollView>
  )
}

export default ShoppingCart

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // alignItems: "center",
  },
  inputsContain: {
    marginVertical: 20,
    // flex:1,
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    color: "black",
    backgroundColor: "white",
    padding: 15,
    marginTop: 15,
  },
  textt: {
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
  error: {
    fontSize: 15,
    color: "yellow",
    margin: 0,
    paddingHorizontal: 5,
    fontWeight: "bold",
  },
  btnAdd: {
    borderColor: "white",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 40,
  },
  rbStyle: {
    height: 32,
    width: 32,
    borderRadius: 110,
    borderWidth: 2,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
})
