import { StatusBar } from 'expo-status-bar';
import * as eva from '@eva-design/eva';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { ApplicationProvider, Button, Input, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import { useState } from 'react';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import VehicleInfoPage from './VehicleInfoPage';

export default function UserHome({ navigation }: Props) {

  const arrowCharacter = '<'; //Creates a variable so the < character can be used in text.
  const BackAction = (): React.ReactElement => (
    <Button onPress={() => navigation.navigate('Login')} appearance='ghost'>{arrowCharacter} Log out</Button>
  );

//  const navigateLogin = () => {
//    navigation.goBack()
//  };




  const navigateVehicleInfoPage = () => {
    navigation.navigate('VehicleInfoPage')
  };

  return (
    <Layout style={styles.container}>

      <SafeAreaView style={{ flex: 1 }}>

        <KeyboardAwareScrollView
          style={{ backgroundColor: '#000000' }}
          scrollEnabled={true}
        >
          <TopNavigation style={styles.barBg} accessoryLeft={BackAction} title={props => <Text {...props}>VaporAudio</Text>} alignment='center' />

          <View style={styles.headerContainer}>
            <Text
              category='h1'
              style={styles.centeredText}>
              Mercedes-Benz 300E 1980
            </Text>
            <Text category='s1'>
              LGM-488
            </Text>
          </View>

          <View style={styles.buttonContainer}>

            <Button 
              style={styles.vehicleInfoButton}
              size='giant'
              accessibilityLabel='Vehicle Information'
              //onPress={() => navigation.navigate('VehicleInfoPage')}
              onPress={navigateVehicleInfoPage}
            >
              VEHICLE INFORMATION
            </Button>

            <Button
              style={styles.vehiclePartButton}
              status='basic'
              size='giant'
              accessibilityLabel='Vehicle Parts'
            // onPress={navigateGarage}>
            >
              VEHICLE PARTS
            </Button>
            <Button
              style={styles.vehicleServicesButton}
              status='basic'
              size='giant'
              accessibilityLabel='Vehicle Parts'
            // onPress={navigateGarage}>
            >
              VEHICLE SERVICES
            </Button>
          </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
    </Layout >
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  barBg: {
    backgroundColor: "black"
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 150,

  },
  centeredText: {
    textAlign:"center",
  },
  vehicleInfoButton: {
    marginVertical: 12,
    width: 300
  },
  vehiclePartButton: {
    marginVertical: 12,
    width: 300
  },
  vehicleServicesButton: {
    marginVertical: 12,
    width: 300
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});