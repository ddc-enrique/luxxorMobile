import {createDrawerNavigator} from '@react-navigation/drawer'
import React from 'react'
import NavStack from './MainNavStack'
import Menu from './Menu'

const Drawer = createDrawerNavigator()
const Navigator = () =>{
    return(
        <Drawer.Navigator drawerContent={(props)=> <Menu {...props}/>}>
                <Drawer.Screen name = "Home" component={NavStack} options={{
                    headerShown: false,
                    
                }}/>
                {/* <Drawer.Screen name="Productos" component={Products} options={{
                    headerShown: false
                }}/>
                <Drawer.Screen name="Registrarme" component={SignUp} options={{
                    headerShown: false
                }}/>
                <Drawer.Screen name="Ingresar" component={SignIn} options={{
                    headerShown: false
                }}/>  */}
        </Drawer.Navigator>
    )
}
export default Navigator

