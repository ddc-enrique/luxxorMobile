import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './navigation/MainNavDrawer';


const App = () => {
  return (
    <NavigationContainer>
        <Navigator/>
    </NavigationContainer>
  )
}
export default App
