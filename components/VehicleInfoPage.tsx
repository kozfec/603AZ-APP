import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, ViewProps,  } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Card, Divider, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import Account from './Account';
import Garage from './Garage';
import UserHome from './UserHome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Tab } from '@ui-kitten/components';
import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { IItem } from '../interfaces/IItem';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


const { Navigator, Screen } = createBottomTabNavigator();




export default function VehicleInfoPage({ navigation, route }: Props){

  const route1 = useRoute();
  const [data, setData] = useState<IItem>({
    carReg: "",
    carMake: "",
    carModel: "",
    carInformation: {
      dryWeight: "",
      fuelType: "",
      enginePower: "",
      engineSize: "",
      driveTrain: ""
    },
}
); 
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


    const Header = (props: ViewProps): React.ReactElement => (
      <View {...props}>
        <Text category='h6'>
          Vehicle Specification
        </Text>
      </View>
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
        <KeyboardAwareScrollView style={{ backgroundColor: '#12171C' }} scrollEnabled={true}>
              <Card style={styles.cardStyle} header={Header}>

                <View style={styles.cardText}>
              <Text >Make: {remainingData.carMake}</Text>              
              <Divider style={styles.lineStyle}/>
              </View>
              <Text>Model: {remainingData.carModel}</Text>
              <Divider style={styles.lineStyle}/>
              <Text>Year: {remainingData.carYear}</Text>
              <Divider style={styles.lineStyle}/>              
              <Text>Dry Weight: {remainingData.carInformation.dryWeight}</Text>
              <Divider style={styles.lineStyle}/>       
              <Text>Fuel Type: {remainingData.carInformation.fuelType}</Text>
              <Divider style={styles.lineStyle}/>
              <Text>Engine Power: {remainingData.carInformation.enginePower}</Text>
              <Divider style={styles.lineStyle}/>
              <Text >Engine Size: {remainingData.carInformation.engineSize}</Text>
              <Divider style={styles.lineStyle}/>
              <Text>Drive Train: {remainingData.carInformation.driveTrain}</Text>
              </Card>
        </KeyboardAwareScrollView>
       </SafeAreaView>      
      </Layout>
      
    );
}



const styles = StyleSheet.create({
  cardText: {


  },
    container: {
        flex: 1,
        backgroundColor: "#12171C",
    },

    insideCard: {
      flex:1,
      flexDirection: 'row',
    },

    lineStyle:{
      horizontalInset: true,
      margin:10,
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

    cardStyle: {
      margin: 10,
      backgroundColor: '#1C3832',
      justifyContent:"center",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
});