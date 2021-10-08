import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Home from '../screens/Home'
import React from 'react'

const Stack = createNativeStackNavigator()
const Navigator = () =>{
    return(
        <Stack.Navigator>
                <Stack.Screen name = "HomeStack" component={Home} options={{
                    headerShown: false
                }}  />
                {/* <Stack.Screen name="Productos" component={Products} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="Producto" component={Product} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="Registrarme" component={SignUp} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="Ingresar" component={SignIn} options={{
                    headerShown: false
                }}/>                   */}
        </Stack.Navigator>
    )
}


export default Navigator