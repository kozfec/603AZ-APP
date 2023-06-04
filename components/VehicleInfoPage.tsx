import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Layout, Text } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import Account from './Account';
import Garage from './Garage';
import UserHome from './UserHome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Tab } from '@ui-kitten/components';
import { useState } from 'react';
import { IItem } from '../interfaces/IItem';
import { useRoute } from '@react-navigation/native';


const { Navigator, Screen } = createBottomTabNavigator();




export default function VehicleInfoPage({ navigation, route }: Props){

  const route1 = useRoute();
  const remainingData = route.params?.remainingData;

  if (!remainingData) {
    return (
      <View>
        <Text>Error: Data not available</Text>
      </View>
    );
  }





    return(
        <Layout style={styles.container}>
            <Layout style={styles.container}>
            <Text>THIS IS THE VEHICLE INFO PAGE</Text>
            <View>
      <Text>Dry Weight: {remainingData.dryWeight}</Text>
      <Text>Fuel Type: {remainingData.fuelType}</Text>
      <Text>Engine Power: {remainingData.enginePower}</Text>
      <Text>Engine Size: {remainingData.engineSize}</Text>
      <Text>Drive Train: {remainingData.driveTrain}</Text>
    </View>
            <Button>Garage button</Button>
        </Layout>
            
      </Layout>
      
    );

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
    },
    tabBg: {
        backgroundColor: "black",
      },
      signUpButton: {
        marginHorizontal: 16,
      },
});