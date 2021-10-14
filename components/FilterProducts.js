import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from "expo-linear-gradient"
import { connect } from "react-redux"
import productsActions from "../redux/actions/productsActions"
import {showMessage} from "react-native-flash-message"
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import { AntDesign,Ionicons } from '@expo/vector-icons'




const FilterProducts = (props) => {
    const [categories, setCategories] = useState(props.categories)
    const [brands, setBrands] = useState(props.brands)
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
                <Text style={styles.textFilter}>Filtrar<Ionicons name="md-arrow-down-outline" size={24} color="#e3e3e3" /></Text>
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
                            <View >
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
                                                onPress={(value) => setActiveBrand(value)}
                                                labelStyle={{fontSize: 20, color: 'white'}}
                                                labelWrapStyle={styles.radioBtnLabel}
                                            />
                                            <RadioButtonInput
                                                obj={brand}
                                                index={i}
                                                isSelected={activeBrand === brand.value}
                                                onPress={(value) => setActiveBrand(value)}
                                                borderWidth={1}
                                                buttonInnerColor={'#2196f3'}
                                                buttonOuterColor={activeBrand === brand.value ? '#2196f3' : '#2196f3'}
                                                buttonSize={28}
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
                            <View >
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
                                                onPress={(value) => setActiveCategory(value)}
                                                labelStyle={{fontSize: 20, color: 'white'}}
                                                labelWrapStyle={styles.radioBtnLabel}
                                            />
                                            <RadioButtonInput
                                                obj={category}
                                                index={i}
                                                isSelected={activeCategory === category.value}
                                                onPress={(value) => setActiveCategory(value)}
                                                borderWidth={1}
                                                buttonInnerColor={'#2196f3'}
                                                buttonOuterColor={activeCategory === category.value ? '#2196f3' : '#2196f3'}
                                                buttonSize={28}
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
                            <AntDesign name="closecircle" size={24} color="white" />
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

const mapStateToProps = (state) => {
    return{
        brands: state.products.brands,
        categories: state.products.categories,
        products: state.products.products
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterProducts)

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: 20,
        width:'80%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#e3e3e3'
    },
    textFilter: {
        color: "white",
        fontSize: 30,
        borderWidth: 1,
        borderColor: '#e3e3e3',
        padding:2,
        textAlign: 'center',
        width: 150,
        marginBottom: 5,
        marginLeft: "6%",
        fontFamily: 'Spartan_500Medium',
        marginLeft: 60
    },
    text: {
        color: "white",
        fontSize: 30,
        textAlign: "center",
        marginBottom: 10,
        fontFamily: 'Spartan_500Medium'
    },
    
    column: {
        width:"40%",
        // backgroundColor: "red"
    },
    eachRadioBtn: {
        width: "85%",
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
        // backgroundColor: "green",
    },
    radioBtn: {
        backgroundColor: 'gray'
    },
    radioBtnLabel: {
        fontSize:20,
        fontFamily: 'Spartan_400Regular'
        
    },
    closeFilter: { 
        alignSelf: "flex-start",
    },
})
