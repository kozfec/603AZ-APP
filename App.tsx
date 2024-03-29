import 'react-native-gesture-handler';
import { SafeAreaView, StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, IconRegistry, Layout, Text } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Verify from './components/Verify';
import Login from './components/Login';
import Register from './components/Register';
import Forgot from './components/Forgot';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';
import { myTheme } from './custom-theme';
import { Amplify } from 'aws-amplify';
import VehicleInfoPage from './components/VehicleInfoPage';


/*Amplify.configure({
  Auth: {
    mandatorySignin: true,
    region: "us-east-1",
    userPoolId: "us-east-1_mD3h5Ek3u",
    userPoolWebClientId: "2itvgt61rhupf6jirr0merjiu6",
  }
});*/
Amplify.configure({
  Auth: {
    mandatorySignin: true,
    region: "us-east-1",
    userPoolId: "us-east-1_I0moTGNdI",
    userPoolWebClientId: "5u997tdpg099nffs5s11k29rga",
  }
});




const Stack = createStackNavigator();

function AuthStack(){ //Dan nevezte el az authStackot authStacknak
  return(
    <SafeAreaView style={{ flex: 1 }}> 
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name = "Login" component={Login}/>
      <Stack.Screen name = "Verify" component={Verify}/>
      <Stack.Screen name = "Register" component={Register}/>
      <Stack.Screen name = "Forgot" component={Forgot}/>
      <Stack.Screen name ="Home" component={Home} options={{gestureEnabled: false}} />
    </Stack.Navigator></SafeAreaView>
  );

}

//... is the spread operator. Keep an eye on it! Do research of it. 

export default function App() {
  return (
    <>
    <IconRegistry icons={EvaIconsPack} /> 
    <ApplicationProvider {...eva} theme={{...eva.dark, ...myTheme}}>  
      <NavigationContainer >
        <AuthStack/>
      </NavigationContainer>
    </ApplicationProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
