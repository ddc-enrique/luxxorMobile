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


const CheckOutProducts = (props) => {
  const [products,setProducts]=useState([])
  const[products2,setProducts2]=useState([])
  const [value, setValue] = useState(0)
  const[total,setTotal]=useState(0)
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

  return(
      <>
        <ScrollView> 
          {props.shopCart.length > 0&&products.map((product,index) => <CardScProduct key={index} product={product}  setTotal={setTotal} total={total}/>)}
          <View>
              <Text style={styles.title}>DATOS DEL DESTINATARIO</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              placeholderTextColor={"white"}
            />
            <TextInput
              style={styles.input}
              placeholder="Apellido"
              placeholderTextColor={"white"}
            />
            <TextInput
              style={styles.input}
              placeholder="DNI"
              placeholderTextColor={"white"}
            />
            <TextInput
              style={styles.input}
              placeholder="Teléfono"
              placeholderTextColor={"white"}
            />
          </View>
          <RadioForm
              radio_props={radio_props}
              initial={0}
              onPress={(value) => setValue(value)}
              labelStyle={{ fontSize: 15,width:"90%", color: "white",marginBottom:20 }}
            />
            {value===1 && 
            <View >
            <Text style={styles.title}>DIRECCION DE ENTREGA</Text>
          <TextInput
            style={styles.input}
            placeholder="Dirección"
            placeholderTextColor={"white"}
          />
          <TextInput
            style={styles.input}
            placeholder="Departamento (opcional)"
            placeholderTextColor={"white"}
          />
          <TextInput
            style={styles.input}
            placeholder="Ciudad"
            placeholderTextColor={"white"}
          />
          <TextInput
            style={styles.input}
            placeholder="Código postal"
            placeholderTextColor={"white"}
          />
          
        </View>
            }
            
            <Text style={{color:"white",margin: 12, marginBottom:10,fontSize:25 }}>TOTAL: $ {(props.total).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
            <TouchableOpacity onPress={()=>props.setScreen(2)} > 
              <View style={styles.boxTitle}>
                <Text style={{color:"white",fontSize:20}}>Continuar Compra</Text>
              </View>
              
             </TouchableOpacity>
       </ScrollView> 
      </>
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
    padding: 10,
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
