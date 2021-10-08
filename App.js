import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './navigation/MainNavDrawer';
import { useFonts,Spartan_400Regular,Spartan_500Medium,Spartan_700Bold
} from '@expo-google-fonts/spartan'
import AppLoading from 'expo-app-loading';
import { 
  PoiretOne_400Regular 
} from '@expo-google-fonts/poiret-one'
// import {LogBox} from 'react-native'
// LogBox.ignoreAllLogs(true)


const App = () => {
  let [fontsLoaded] = useFonts({
    Spartan_400Regular,
    Spartan_500Medium,
    Spartan_700Bold,
    PoiretOne_400Regular 
  })
  if(!fontsLoaded){
    return <AppLoading/>
  } else {
  return (
    <NavigationContainer>
        <Navigator/>
    </NavigationContainer>
  )
  }
}
export default App
