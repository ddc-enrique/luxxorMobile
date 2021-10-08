import React from "react";
import { View, TextInput,StyleSheet, Text} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const Contact = () =>{
    return(
        <View style={styles.containerContact}>
            <Text style={styles.textCategories}>
            CONTACTANOS
            </Text>
            <TextInput style={styles.input}  
                placeholder='Nombre'  
                />
            <TextInput style={styles.input}  
                placeholder='Email' 

                />
            <TextInput style={styles.input}  
                    placeholder='Mensaje' 
                    multiline={true}
                    numberOfLines={4}
            />  
            <TouchableOpacity>
                <View style={styles.buttonSend}>
                    <Text style={styles.textButton}>
                        Enviar
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}
export default Contact

const styles = StyleSheet.create({
    containerContact:{
        width: '80%',
        minHeight: 400,
        alignItems: "center",
        marginVertical: 50,
        backgroundColor:'#e5e5e521',
        paddingVertical: 50
    },
    input: {
        width: '80%',
        height: 50,
        marginVertical: 15,
        fontSize: 20,
        borderBottomWidth: 1,
        borderColor: '#e3e3e3'
    },
    textCategories:{
        fontFamily: 'Spartan_400Regular',
        fontSize: 30,
        textAlign: "center",
        marginVertical:10,
        color:'#545454',
        width: '80%',
        paddingVertical:10,
        backgroundColor: 'white'
    },
    buttonSend:{
        width:100,
        height: 50,
        backgroundColor: '#e3e3e3',
        justifyContent: "center",
        alignItems: "center"
    },
    textButton:{
        fontSize: 20,
        fontFamily: 'Spartan_400Regular',
        color:'#545454',
    }
})