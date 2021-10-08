import React, { useState } from "react"
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  ImageBackground,
} from "react-native"
import Header from "../components/Header"
import { LinearGradient } from "expo-linear-gradient"
import SelectPicker from "react-native-form-select-picker"

const Products = (props) => {
  const [isEnabled, setIsEnabled] = useState(false)
  const [selected, setSelected] = useState()
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState)
  const options = ["Mayor precio", "Menor precio", "A-Z","Z-A"]
  const image = {
    uri: "https://i.postimg.cc/Jhmptvkj/1000x1000-1-removebg-preview-1.png",
  }

  return (
    <ScrollView>
      <View>
        <Header {...props} />
        <LinearGradient
          colors={[" rgba(47,144,176,0.5)", "rgba(48,106,154,0.5)"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 1 }}
          style={styles.container}
        >
          <Text style={styles.text}>Marca</Text>
          <View style={styles.category}>
            <View style={styles.uniqueRadio}>
              <Text>Option 1</Text>
              <Switch
                trackColor={{ false: "#767577", true: "rgba(49,25,109,1)" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <View style={styles.uniqueRadio}>
              <Text>Option 1</Text>
              <Switch
                trackColor={{ false: "#767577", true: "rgba(49,25,109,1)" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
          <Text style={styles.text}>Categoria</Text>
          <View style={styles.category}>
            <View style={styles.uniqueRadio}>
              <Text>Option 1</Text>
              <Switch
                trackColor={{ false: "#767577", true: "rgba(49,25,109,1)" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            <View style={styles.uniqueRadio}>
              <Text>Option 1</Text>
              <Switch
                trackColor={{ false: "#767577", true: "rgba(49,25,109,1)" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
        </LinearGradient>
        <View style={styles.selectOptions}>
          <Text>Ordena por:</Text>
          <SelectPicker
            placeholderStyle={{ color: "black" }}
            onValueChange={(value) => {
              setSelected(value)
            }}
            selected={selected}
            style={styles.input}
            placeholder="Rango a elegir"
          >
            {Object.values(options).map((val, index) => (
              <SelectPicker.Item label={val} value={val} key={index} />
            ))}
          </SelectPicker>
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <View style={styles.cardTitle}>
                <View style={{borderBottomColor: 'black',borderBottomWidth: 1}}>
                     <Text style={styles.cardTitleText}>Ver +</Text>
                </View>
            </View>
            <View style={styles.centerCard}>
              <ImageBackground
                source={image}
                resizeMode="cover"
                style={styles.image}
              ></ImageBackground>
              <Text style={{textAlign: 'center',fontSize:15,marginVertical:10}}>AirPods deliver an unparalleled listening experience with all your devices.</Text>
            </View>
            <View style={styles.prices}>
                <Text style={{color:'red',fontWeight: 'bold',}}>%10</Text>
                <Text style={{color:'red',fontWeight: 'bold',}}>$282000</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.cardTitle}>
            <View style={{borderBottomColor: 'black',borderBottomWidth: 1}}>
                     <Text style={styles.cardTitleText}>Ver +</Text>
                </View>
            </View>
            <View style={styles.centerCard}>
              <ImageBackground
                source={image}
                resizeMode="cover"
                style={styles.image}
              ></ImageBackground>
              <Text style={{textAlign: 'center',fontSize:15,marginVertical:10}}>AirPods deliver an unparalleled listening experience with all your devices.</Text>
            </View>
            <View style={styles.prices}>
                <Text style={{color:'red',fontWeight: 'bold',}}>%10</Text>
                <Text style={{color:'red',fontWeight: 'bold',}}>$282000</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Products

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  text: {
    color: "white",
    fontSize: 30,
  },
  uniqueRadio: {
    marginHorizontal: 8,
  },
  selectOptions: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    paddingVertical: 10,
  },
  category: {
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    height: 40,
    width: 230,
    margin: 12,
    padding: 10,
    borderRadius: 2,
    borderColor: "#000e19",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10,
    // backgroundColor: "white",
  },
  cardContainer: {
    alignItems: "center",
  },
  card: {
    marginVertical: 10,
    width: 300,
    backgroundColor:"white",
    padding:10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5, 
  },
  cardTitle: {
      //color:'white'
  },
  cardTitleText:{
    marginLeft:15,
    fontSize:20,
    paddingVertical:5
  },
  image: {
    flex: 1,
    justifyContent: "center",
    height: 200,
    width: 200,
    marginTop:10
  },
  centerCard:{
      alignItems: "center",
  },
  prices:{
    flexDirection:'row',
    justifyContent: 'space-between',
    flex:1, 
    marginVertical:10
  }
})
