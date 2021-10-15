import React, { useState,useEffect } from "react"
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity
} from "react-native"
import { showMessage, hideMessage } from "react-native-flash-message";
import { connect } from "react-redux"
import shopCartActions from '../redux/actions/shopCartActions'
import productsActions from "../redux/actions/productsActions"
import usersAction from "../redux/actions/usersAction";
import CardScProduct from '../components/CardScProduct'

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

const CheckOutProducts = (props) => {

  const {propsNavigation}=props
  const [products,setProducts]=useState([])
  const[products2,setProducts2]=useState([])
  const [value, setValue] = useState(0)
  const[total,setTotal]=useState(0)
  const[dataClient,setDataClient]=useState({firstName: props.firstName, lastName: props.lastName,dni:props.dni} )
  const[dataAddress,setDataAddress]=useState({})
  const arrayProd=[]


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
          setProducts2(arrayProd.push(aux))
          if(arrayProd.length !== 0)setProducts(arrayProd) 
      })
      .catch(e=>console.log(e))
  }) 
  props.getUserData(props.id,props.token)
        .then(res=>{
            setDataAddress(res)
            setDataClient({firstName: props.firstName, lastName: props.lastName,dni:props.dni,phone:res.phone}) 
            /* console.log("dataClient1",dataClient) */
        })
        .catch(e=>console.log(e))
  }, [])

  const handlerInput = (e, campo,type) => {
    if (type==="receiver"){
      setDataClient({
        ...dataClient,
        [campo]: e 
      })
    }else{
      setDataAddress({
        ...dataAddress,
        [campo]:e
      })
    }
    
}
  const submitHandler=()=>{
    let inputs=Object.values(dataClient).some((input)=>input==="")  
    let inputsShipping=Object.values(dataAddress).filter(item=>item==="optional").some((input)=>input==="")  
    if(props.shopCart.length===0){
      showMessage({
        message: 'Debe tener al menos un producto el carrito.',
        type: "warning",
        backgroundColor: "rgba(49,25,109,1)",
      });
      /* propsNavigation.navigation.navigate('Productos') */
      }else if(value===0 && inputs || value===1&&inputsShipping || value===1&&inputs ){
        showMessage({
          message: 'Por favor llena todos los campos para continuar.',
          type: "warning",
          backgroundColor: "rgba(49,25,109,1)",
        });
      }else{
        if(value===0){
          props.setShipping(false)
        }else{
          props.setShipping(true)
        }
        props.setScreen(2)
      }
      
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
              onChangeText={(e) => handlerInput(e, 'firstName',"receiver")}
              defaultValue={props.firstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              placeholderTextColor={"white"}
              onChangeText={(e) => handlerInput(e, 'lastName',"receiver")}
              defaultValue={props.lastName}
            />
            <TextInput
              style={styles.input}
              placeholder="DNI"
              placeholderTextColor={"white"}
              keyboardType={"numeric"}
              onChangeText={(e) => handlerInput(e, 'dni',"receiver")}
              defaultValue={props.dni&&(props.dni).toString()}
            />
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              placeholderTextColor={"white"}
              keyboardType={"numeric"}
              onChangeText={(e) => handlerInput(e, 'phone',"receiver")}
              defaultValue={dataAddress.phone}
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
            onChangeText={(e) => handlerInput(e, 'address',"info_address")}
            defaultValue={dataAddress.address}
          />
          <TextInput
            style={styles.input}
            placeholder="Departamento (opcional)"
            placeholderTextColor={"white"}
            onChangeText={(e) => handlerInput(e, 'optional',"info_address")}
            defaultValue={dataAddress.optional}
          />
          <TextInput
            style={styles.input}
            placeholder="Ciudad"
            placeholderTextColor={"white"}
            onChangeText={(e) => handlerInput(e, 'city',"info_address")}
            defaultValue={dataAddress.city}
          />
          <TextInput
            style={styles.input}
            placeholder="Código postal"
            placeholderTextColor={"white"}
            keyboardType={"numeric"}
            onChangeText={(e) => handlerInput(e, 'zipCode',"info_address")}
            defaultValue={dataAddress&& dataAddress.zipCode.toString()}
          />
          
        </View>
            }
            
            <Text style={{color:"white",margin: 12, marginBottom:10,fontSize:25 }}>TOTAL: $ {(props.total).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
            <View style={{width:"100%", alignItems:'center'}}>
              <TouchableOpacity onPress={submitHandler} > 
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
      id:state.users.id,
      token:state.users.token,
      lastName:state.users.lastName,
      firstName:state.users.firstName,
      dni:state.users.dni,
      total:state.shopCart.total,
      subtotal:state.shopCart.subtotal
    }
  }
  const mapDispatchToProps ={
    deleteProduct:shopCartActions.deleteToCart,
    product:productsActions.product,
    getUserData:usersAction.getUserData 

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
