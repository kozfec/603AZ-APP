import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import Account from './Account';
import Garage from './Garage';
import UserHome from './UserHome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Tab } from '@ui-kitten/components';
import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


const { Navigator, Screen } = createBottomTabNavigator();




export default function VehicleInfoPage({ navigation, route }: Props){

  const route1 = useRoute();
  const remainingData = route.params?.remainingData;

  if (!remainingData) {
    return (
      <View>
        <Text>Sorry, your vehicles information currently unavailable </Text>
      </View>
    );
  }

  const probaIcon = <Ionicons name="arrow-back-sharp" size={25} color="black" /> //Create a Icon variable
    const BackAction = (): React.ReactElement => (
    <Ionicons name="arrow-back-sharp" size={25} color="#83AF9F" onPress={() => navigation.navigate('UserHomeafterLogin')}  appearance='ghost'/>
    );



    return(
        <Layout style={styles.container}>
        <TopNavigation style={styles.barBg} accessoryLeft={BackAction}  title={props => <Text {...props}>Manage Your Car</Text>} alignment='center' />
        <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerContainer} >
            <Text category='h1'>{remainingData.carMake ? remainingData.carMake : ''} {remainingData.carModel ? remainingData.carModel : ''}</Text>
            <Text style={styles.headerLabel} category='s1'>
              {remainingData.carReg}
            </Text>
          </View>
            <Text>THIS IS THE VEHICLE INFO PAGE</Text>
            <View>
              <Text>Dry Weight: {remainingData.carInformation.dryWeight}</Text>
              <Text>Fuel Type: {remainingData.carInformation.fuelType}</Text>
              <Text>Engine Power: {remainingData.carInformation.enginePower}</Text>
              <Text>Engine Size: {remainingData.carInformation.engineSize}</Text>
              <Text>Drive Train: {remainingData.carInformation.driveTrain}</Text>
            </View>
              <Button>Garage button</Button>
       </SafeAreaView>      
      </Layout>
      
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#12171C",
    },
    barBg: {
      backgroundColor: "#181E28",
    },
    tabBg: {
        backgroundColor: "black",
      },
      signUpButton: {
        marginHorizontal: 16,
      },
      headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        //minHeight: 216,
        backgroundColor:'#12171C',
      },
      headerLabel: {
        marginTop: 16,
        },
});