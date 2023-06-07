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


export function AddCarProba({ navigation, route }: Props) {

  const [registration, setRegistration] = useState('');
  const id= registration;

  const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<IItem>({
        carReg: "",
        carMake: "",
        carModel: "",
        carInformation: {
          dryWeight: "",
          fuelType: "",
          enginePower: "",
          engineSize: "",
          driveTrain: "",
          carColor: "",
        },
    }
    );

  async function getCar() {
    try {
      const response = await fetch(`https://0v05jnucib.execute-api.us-east-1.amazonaws.com/Default/items/${id}`);
        const json = await response.json();
        json.carInformation = JSON.parse(json.carInformation);
        console.log(json);
        setData(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };



    useEffect(() => {
      getCar();
    }, []);




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
             value={registration}
             onChangeText={(text) => setRegistration(text)}
             >
            </Input>
            
            <Divider style={styles.lineStyle} />
            <View style={styles.popUpCardView}>
              <Button style={styles.addBtn} onPress={getCar}>Add</Button>
              <Button style={styles.cancelBtn}>Cancel</Button>
            </View>
          </Card>

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
  },
  cancelBtn: {
    width: 150,
    backgroundColor: '#B71314',
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