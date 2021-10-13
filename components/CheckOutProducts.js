import React, { useState,useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Switch,
  ImageBackground,
  Button,
  Image,
  TouchableOpacity
} from "react-native"
import { connect } from "react-redux"
import shopCartActions from '../redux/actions/shopCartActions'
import productsActions from "../redux/actions/productsActions"
import CardScProduct from '../components/CardScProduct'
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

const CheckOutProducts = (props) => {
  const [products,setProducts]=useState([])
  const[products2,setProducts2]=useState([])
  const [value, setValue] = useState(0)
  const[total,setTotal]=useState(0)
  const[dataClient,setDataClient]=useState({firstName: '', lastName: '',dni:"",phone:"",address:"",optional:"",city:"",zipCode:""})
  let aux
  const radio_props = [
    { label: "Retiro en local", value: 0 },
    { label: "Envio a domicilio-Entrega a partir de 5 dias hábiles", value: 1 },
  ]
  useEffect(() => {
    props.shopCart.forEach(item=>{
      props.product(item.productId)
      .then((res)=>{
          aux= {...res.data.response,quantity:item.quantity}
           setProducts2(products2.push(aux))
           setProducts(products2) 
      })
      .catch(e=>console.log(e))
  }) 
  }, [])
  const handlerInput = (e, campo) => {
    setNewUser({
        ...dataClient,
        [campo]: e 
    })
}

  return(
    <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={false}>
      <ScrollView> 
          {props.shopCart.length > 0&&products.map((product,index) => <CardScProduct key={index} product={product}  setTotal={setTotal} total={total}/>)}
          <View style={{marginTop:35}}>
              <Text style={styles.title}>DATOS DEL DESTINATARIO</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor={"white"}
              onChangeText={(e) => handlerInput(e, 'firstName')}
              defaultValue={"holi"}
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              placeholderTextColor={"white"}
              onChangeText={(e) => handlerInput(e, 'lastName')}
            />
            <TextInput
              style={styles.input}
              placeholder="DNI"
              placeholderTextColor={"white"}
              keyboardType={"numeric"}
              onChangeText={(e) => handlerInput(e, 'dni')}
            />
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              placeholderTextColor={"white"}
              keyboardType={"numeric"}
              onChangeText={(e) => handlerInput(e, 'phone')}
            />
          </View>
            <RadioForm formHorizontal={false} animation={true} style={{width:"90%", marginBottom:20}}>                            
                {radio_props.map((obj, i) => (
                  <RadioButton labelHorizontal={true} key={i} >
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={value === i}
                    onPress={()=>setValue(i)}
                    borderWidth={1}
                    buttonInnerColor={'white'}
                    buttonOuterColor={value === i ? '#FFF' : '#FFF'}
                    buttonSize={23}
                    buttonOuterSize={30}
                    buttonStyle={{}}
                    buttonWrapStyle={{marginLeft: 10}}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={()=>setValue(i)}
                    labelStyle={{fontSize: 15, color: '#FFF'}}
                    labelWrapStyle={{}}
                  />
                  </RadioButton>
                ))
                }  
            </RadioForm>
            
            {value===1 && 
            <View >
            <Text style={styles.title}>DIRECCION DE ENTREGA</Text>
          <TextInput
            style={styles.input}
            placeholder="Dirección"
            placeholderTextColor={"white"}
            onChangeText={(e) => handlerInput(e, 'address')}
          />
          <TextInput
            style={styles.input}
            placeholder="Departamento (opcional)"
            placeholderTextColor={"white"}
            onChangeText={(e) => handlerInput(e, 'optional')}
          />
          <TextInput
            style={styles.input}
            placeholder="Ciudad"
            placeholderTextColor={"white"}
            onChangeText={(e) => handlerInput(e, 'city')}
          />
          <TextInput
            style={styles.input}
            placeholder="Código postal"
            placeholderTextColor={"white"}
            keyboardType={"numeric"}
            onChangeText={(e) => handlerInput(e, 'zipCode')}
          />
          
        </View>
            }
            
            <Text style={{color:"white",margin: 12, marginBottom:10,fontSize:25 }}>TOTAL: $ {(props.total).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
            <View style={{width:"100%", alignItems:'center'}}>
              <TouchableOpacity onPress={()=>props.setScreen(2)} > 
                <View style={styles.boxTitle}>
                  <Text style={{color:"white",fontSize:20}}>Continuar Compra</Text>
                </View>               
              </TouchableOpacity>
            </View>
            
       </ScrollView> 
    </KeyboardAwareScrollView>
  )

}

const mapStateToProps = (state) => {
    return {
      shopCart:state.shopCart.shopCart,
      total:state.shopCart.total,
      subtotal:state.shopCart.subtotal
    }
  }
  const mapDispatchToProps ={
    deleteProduct:shopCartActions.deleteToCart,
    product:productsActions.product  

  }
export default connect(mapStateToProps, mapDispatchToProps)(CheckOutProducts)
const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "90%",
    margin: 12,
    padding: 5,
    borderRadius: 2,
    color: "white",
    borderBottomColor: "white",
    borderBottomWidth: 2,
    backgroundColor: "transparent",
    fontSize: 20,
  },
  title:{
    fontSize:20,
    textAlign:"center",
    color:"white"
  },
  boxTitle:{
    borderWidth:2,
    borderColor:"white",
    width:"55%",
    padding:8
  }
})
