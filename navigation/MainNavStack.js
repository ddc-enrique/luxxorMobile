import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from '../screens/Home'
import SignUp from '../screens/SignUp'
import SignIn from '../screens/SignIn'
import Products from '../screens/Products'
import Product from '../screens/Product'
import React from 'react'
import ShoppingCart from '../screens/ShoppingCart'
import MyAccount from '../screens/MyAccount'

const Stack = createNativeStackNavigator()
const Navigator = () =>{
    return(
        <Stack.Navigator>
                <Stack.Screen name = "HomeStack" component={Home} options={{
                    headerShown: false
                }}  />
                 <Stack.Screen name="Productos" component={Products} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="ShoppingCart" component={ShoppingCart} options={{
                    headerShown: false
                }}/>
                {/*<Stack.Screen name="Producto" component={Product} options={{
                    headerShown: false
                }}/> */}
                <Stack.Screen name="Registrarme" component={SignUp} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="Ingresar" component={SignIn} options={{
                    headerShown: false
                }}/> 
                <Stack.Screen name="Producto" component={Product} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="MiCuenta" component={MyAccount} options={{
                    headerShown: false
                }}/>                
        </Stack.Navigator>
    )
}


export default Navigator