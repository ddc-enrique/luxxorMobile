import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ShoppingCart from '../screens/ShoppingCart'
import Checkout from '../screens/Checkout'
import React from 'react'

const Stack = createNativeStackNavigator()

const ShopCartNavigator = () => {
   return (
      <Stack.Navigator>
         <Stack.Screen
            name='Shopping Cart'
            component={ShoppingCart}
            options={{
               headerShown:false
            }}
         />
         <Stack.Screen
            name='Checkout'
            component={Checkout}
            options={{
               headerShown:false
            }}
         />
      </Stack.Navigator>
   )
}

export default ShopCartNavigator