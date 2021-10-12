import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from "expo-linear-gradient"
import { connect } from "react-redux"
import productsActions from "../redux/actions/productsActions"
import {showMessage} from "react-native-flash-message"
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import { AntDesign } from '@expo/vector-icons'



const FilterProducts = (props) => {
    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [activeBrand, setActiveBrand] = useState("allBrands")
    const [activeCategory, setActiveCategory] = useState("allCategories")
    const [visible, setVisible] = useState(false)
    let inputsBrands = [{value:"allBrands", label: "Todas" }]
    let inputsCategories = [{value:"allCategories", label: "Todas" }]
    useEffect(()=>{
        const getAllBrands = async () => {
            try {        
                if(!brands.length){
                    let response = await props.getBrands()
                    setBrands(response)
                }
            } catch (error) {
                showMessage({
                    "message":"Error de Conexión",
                    "type":"danger"
                })
            }
        }        
        getAllBrands()

        const getAllCategories = async () => {
            try {        
                if(!categories.length){
                    let response = await props.getCategories()
                    setCategories(response)
                }
            } catch (error) {
                showMessage({
                    "message":"Error de Conexión",
                    "type":"danger"
                })
            }
        }
        getAllCategories()        
    },[])
    useEffect(() => {
        let flagAllBrands = activeBrand === "allBrands"
        let flagAllCategories = activeCategory === "allCategories"
        let fp = props.products.filter( product => {
            if (flagAllBrands && flagAllCategories) return true
            if(activeCategory === product.category._id && flagAllBrands) return true
            if(activeBrand === product.brand._id && flagAllCategories) return true
            if( activeCategory === product.category._id && activeBrand === product.brand._id ) return true
            return false
        })
        props.setFilteredProducts(fp)
    },[activeBrand, activeCategory])

    brands.forEach(brand => {
        inputsBrands.push({ value: brand._id, label: brand.name })
    })

    categories.forEach(category => {
        inputsCategories.push({ value: category._id, label: category.name })
    })

    return (
        <View>
            <TouchableOpacity
                onPress={() => setVisible(!visible)}
            >
                <Text>Filtrar por: </Text>
            </TouchableOpacity>
            {visible &&
                    <LinearGradient
                        colors={[" rgba(47,144,176,0.5)", "rgba(48,106,154,0.5)"]}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.container}
                    >
                        <View style={styles.column}>
                            <Text style={styles.text}>Marca</Text>
                            <View style={styles.category}>
                                <RadioForm
                                    formHorizontal={false}
                                    animation={true}
                                >
                                    {inputsBrands.map((brand, i) => (
                                        <RadioButton labelHorizontal={true} key={i} style={styles.eachRadioBtn}>
                                            <RadioButtonLabel
                                                obj={brand}
                                                index={i}
                                                labelHorizontal={true}
                                                onPress={() => setActiveBrand(brand._id)}
                                                labelStyle={{fontSize: 20, color: 'white'}}
                                                labelWrapStyle={styles.radioBtnLabel}
                                            />
                                            <RadioButtonInput
                                                obj={brand}
                                                index={i}
                                                // isSelected={this.state.value3Index === i}
                                                onPress={() => setActiveBrand(brand._id)}
                                                borderWidth={1}
                                                buttonInnerColor={'#e74c3c'}
                                                // buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                                                buttonSize={20}
                                                buttonOuterSize={40}
                                                buttonStyle={styles.radioBtn}
                                                buttonWrapStyle={{marginLeft: 5}}
                                            />
                                        </RadioButton>
                                    ))}
                                </RadioForm>
                            </View>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.text}>Categoria</Text>
                            <View style={styles.category}>
                                <RadioForm
                                    formHorizontal={false}
                                    animation={true}
                                >
                                    {inputsCategories.map((category, i) => (
                                        <RadioButton labelHorizontal={true} key={i} style={styles.eachRadioBtn}>
                                            <RadioButtonLabel
                                                obj={category}
                                                index={i}
                                                labelHorizontal={true}
                                                onPress={() => setActiveCategory(category._id)}
                                                labelStyle={{fontSize: 20, color: 'white'}}
                                                labelWrapStyle={styles.radioBtnLabel}
                                            />
                                            <RadioButtonInput
                                                obj={category}
                                                index={i}
                                                // isSelected={this.state.value3Index === i}
                                                onPress={() => setActiveCategory(category._id)}
                                                borderWidth={1}
                                                buttonInnerColor={'#e74c3c'}
                                                // buttonOuterColor={this.state.value3Index === i ? '#2196f3' : '#000'}
                                                buttonSize={20}
                                                buttonOuterSize={40}
                                                buttonStyle={styles.radioBtn}
                                                buttonWrapStyle={{marginLeft: 5}}
                                            />
                                        </RadioButton>
                                    ))}
                                </RadioForm>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() => setVisible(!visible)}
                            style={styles.closeFilter}
                        >
                            <AntDesign name="closecircle" size={24} color="black" />
                        </TouchableOpacity>
                    </LinearGradient>
            }
        </View>
    )
}

const mapDispatchToProps = {
    getCategories: productsActions.categories,
    getBrands: productsActions.brands
}

export default connect(null, mapDispatchToProps)(FilterProducts)

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingVertical: 15,
        paddingLeft: 20,
        paddingRight: 5,
    },
    text: {
        color: "white",
        fontSize: 30,
    },
    column: {
        width:"40%",
    },
    category: {
        width: "100%",
        marginVertical: 15,
        justifyContent: "center",        
        alignItems: "center",
        flexDirection: "row",
    },
    eachRadioBtn: {
        width: "80%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "green"
    },
    radioBtn: {

    },
    radioBtnLabel: {
        fontSize:20
    },
    closeFilter: { 
        alignSelf: "flex-start",
    },
})
