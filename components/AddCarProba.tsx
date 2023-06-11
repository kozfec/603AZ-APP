import { StatusBar } from 'expo-status-bar';
import * as eva from '@eva-design/eva';
import { ActivityIndicator, GestureResponderEvent, KeyboardAvoidingView, StyleSheet, View, Image, ViewProps } from 'react-native';
import { ApplicationProvider, Avatar, Button, Card, Divider, Input, Layout, List, Modal, Spinner, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import UserHome_1 from "./UserHome_1";
import { Ionicons } from '@expo/vector-icons';
import VehicleInfoPage from './VehicleInfoPage';
import OilManagement from './OilManagement';
import { AntDesign } from '@expo/vector-icons';
import { IItem } from '../interfaces/IItem';
import { ICarInformation } from '../interfaces/ICarInformation';


export function AddCarProba({ navigation, route }: Props) {

  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [request, setRequest] = useState({
    carReg: "",
    oilChange: "[]"
  }
  );

  const [data, setData] = useState<IItem>({
    carMake: "",
    carReg: "",
    carModel: "",
    carInformation: {
      dryWeight: "",
      fuelType: "",
      driveTrain: "",
      enginePower: "",
      engineSize: "",
      carColor: "",
    },
    carYear: ""
  });

  const addCarToDatabase = async () => {
    setLoading(true);
    const user = await Auth.currentSession();
    const accessToken = user.getAccessToken().getJwtToken();
    const idToken = user.getIdToken().getJwtToken();
    const req = JSON.stringify(request);
    console.log(req);
    try {
      const response = await fetch("https://y6bhm2g1q1.execute-api.us-east-1.amazonaws.com/items", {
        headers: {
          "Authorization": idToken,
          "accesstoken": accessToken,
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: req,
      });
      const json = await response.json();
      console.log(json);
      setData(json);
    } catch (error) {
      console.error('Failed to add car:', error);
    }
  };



  useEffect(() => {

  }, []);

  const [visible, setVisible] = React.useState(false);

  const Header2 = (): React.ReactElement => (
    <View style={styles.textProba}>
      <Text category='h6'>
        Car has been added
      </Text>
    </View>
  );

  const addCarClick = () => {
    addCarToDatabase();
    setVisible(true);
  };




  const BackAction = (): React.ReactElement => (
    <Ionicons name="arrow-back-sharp" size={25} color="#83AF9F" onPress={() => navigation.navigate('UserHomeafterLogin')} appearance='ghost' />
  );


  return (

    <Layout style={styles.container}>
      <TopNavigation style={styles.barBg} accessoryLeft={BackAction} title={props => <Text {...props}>Add a vehicle</Text>} alignment='center' />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView style={{ backgroundColor: '#12171C' }} scrollEnabled={true}>
          <View style={styles.headerContainer}  >
            <Text style={styles.textProba} category='h2'>Please enter a valid UK reg number</Text>
          </View>

          <Card style={styles.cardStyle} >
            <Input
              autoCapitalize='characters'
              textAlign='center'
              placeholder='e.g. XX99ZZZ'
              value={request.carReg}
              onChangeText={(text) => setRequest({ ...request, carReg: text.toUpperCase() })}
            //onSubmitEditing={(value) => setRegistration(value.nativeEvent.text)}
            /*onKeyPress={({ nativeEvent }) => {
             if (nativeEvent.key === 'Enter') {
               addCarClick();
             }
           }}*/

            />


            <Divider style={styles.lineStyle} />
            <View style={styles.popUpCardView}>
              <Button style={styles.addBtn} onPress={addCarClick}>Add</Button>
              <Button style={styles.cancelBtn} onPress={() => navigation.navigate('UserHomeafterLogin')}>Cancel</Button>
            </View>
          </Card>






          <Modal
            visible={visible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}
          >

            <Card style={styles.cardStyle2} disabled={true} header={Header2}>
              {error ? (
                <Text category='h6' >{error}</Text>
              ) : (
                <>

                  <Text category='h1' style={styles.textProba}>{data!.carMake} {data!.carModel}</Text>
                  <Text category='h3' style={styles.textProba}>{data!.carInformation.carColor}</Text>
                  <Text category='h6' style={styles.textProba}>{data!.carReg}</Text>
                  <Divider style={styles.lineStyle} />
                  <View style={styles.popUpCardView}>
                    <Button style={styles.addBtn} onPress={() => navigation.navigate('UserHomeafterLogin')}>Return to Garage</Button>
                  </View>
                </>
              )}

            </Card>

          </Modal>


        </KeyboardAwareScrollView>
      </SafeAreaView>
    </Layout>

  );
}






const styles = StyleSheet.create({
  avatar: {
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 45,
    left: 325
  },
  container: {
    flex: 1,
    backgroundColor: "#12171C",
  },
  barBg: {
    backgroundColor: "#181E28"
  },
  spinner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    flex: 1,

  },
  cardStyle: {
    height: 150,
    marginBottom: 20,
    backgroundColor: '#1C3832',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flex: 1,
  },
  cardBackground: {
    flex: 1,
    backgroundColor: '#1C3832',
  },
  itemTitle: {
    zIndex: 4,
    color: 'white'
  },
  itemDescription: {
    zIndex: 1,
    marginVertical: 16,
    color: 'white',
    position: 'absolute',
    top: 60,
    left: 25
  },
  list: {
    backgroundColor: '#12171C'
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    //minHeight: 216,
    backgroundColor: '#12171C',
    marginBottom: 20,
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: '#7A823C',
  },

  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 65,
    height: 65,
    //backgroundColor:'black'
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: '#7A823C'
  },
  addBtn: {
    marginEnd: 25,
    width: 150,
    backgroundColor: '#7A823C',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,

  },
  cancelBtn: {
    width: 150,
    backgroundColor: '#B71314',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cardStyle2: {
    width: 350,
    backgroundColor: '#1C3832',
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  popUpCardView: {
    flexDirection: 'row',
    justifyContent: 'center',

  },
  textInCard: {
    marginBottom: 10
  },
  lineStyle: {
    horizontalInset: true,
    margin: 10,
  },
  textProba: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
});
function navigateBack(event: GestureResponderEvent): void {
  throw new Error('Function not implemented.');
}