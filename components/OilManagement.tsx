import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, ViewProps, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Card, Datepicker, Divider, Icon, IconElement, Layout, Text, TopNavigation, Modal, Input } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import Account from './Account';
import Garage from './Garage';
import UserHome from './UserHome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Tab } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { IItem } from '../interfaces/IItem';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { IOil } from '../interfaces/IOil';
import { Auth } from 'aws-amplify';



const { Navigator, Screen } = createBottomTabNavigator();




export default function OilManagement({ navigation, route }: Props) {

  //const route1 = useRoute();

  

  const [registration, setRegistration] = useState('');

  const [oil, setOil] = useState<IOil[]>([]);

  const [isLoading, setLoading] = useState(true);

  const remainingData = route.params?.remainingData;
 

  if (!remainingData) {
    return (
      <Layout style={styles.container}>
        <View style={styles.headerContainer} >
          <Text>Sorry, your vehicle information currently unavailable </Text>
        </View>
      </Layout>
    );
  }

  const id = remainingData.carReg;
  //loop through all of the items and get the one with the same 
  const userName = "kozakf%40cu.coventry.ac.uk";

  const getOil = async () => {
    try {
      console.log(id);
      const user = await Auth.currentSession();
      const accessToken = user.getAccessToken().getJwtToken();
      console.log(accessToken);
      const idToken = user.getIdToken().getJwtToken();
      const response = await fetch(`https://y6bhm2g1q1.execute-api.us-east-1.amazonaws.com/items/${userName}/${id}`, {
        headers: {
          "Authorization": idToken,
          "accesstoken": accessToken,
          
        }
      });
      const json = await response.json();
      console.log(json)
      if (typeof json.oilChange === 'string') {
        json.OilChange = JSON.parse(json.oilChange);
      } else {
        json.OilChange = [];
      }
      setOil(json.OilChange);
      console.log(setOil);
    } catch (error) {
      console.log("Hiba can:", error);
    } finally {
      setLoading(false);
    }
  };

  const navigateItem = (item: IItem) => {
    navigation.navigate('UserHome_1', { paramKey: item.carReg })
  }

  const backIcon = <Ionicons name="arrow-back-sharp" size={25} color="black" /> //Create a Icon variable
  const BackAction = (): React.ReactElement => (
    <Ionicons name="arrow-back-sharp" size={25} color="#83AF9F" onPress={() => navigateItem(remainingData.carReg)} appearance='ghost' />
  ); //For the nav bar icon


  const Header = (): React.ReactElement => (
    <View style={styles.textProba}>
      <Text category='h6'>
        Oil Change History
      </Text>
    </View>
  ); //For the card heading

  const Header2 = (): React.ReactElement => (
    <View style={styles.textProba}>
      <Text category='h6'>
        Add new oil change
      </Text>
    </View>
  );


  const CalendarIcon = (): IconElement => (
    <FontAwesome name="calendar-plus-o" size={24} color="black" />
  );

  const [date, setDate] = React.useState(new Date()); //For the calendar

  const [visible, setVisible] = React.useState(false); //For the modal visibility

  const [odoInputValue, setOdoInputValue] = React.useState(''); //For the modal input for Odometer reading

  const [oilInputValue, setOilInputValue] = React.useState(''); //For the modal input for oil change

  const [oilFilterInputValue, setOilFilterInputValue] = React.useState('');


  useEffect(() => {
    getOil()
  }, []);



  return (


    <Layout style={styles.container}>
      <TopNavigation style={styles.barBg} accessoryLeft={BackAction} title={props => <Text {...props}>Oil Management</Text>} alignment='center' />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerContainer} >
          <Text category='h1'>{remainingData.carMake ? remainingData.carMake : ''} {remainingData.carModel ? remainingData.carModel : ''}</Text>
          <Text style={styles.headerLabel} category='s1'>
            {remainingData.carReg}
          </Text>
        </View>



        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}
        >

          <Card style={styles.cardStyle2} disabled={true} header={Header2}>

            <Text style={styles.textInCard}>Date of change:</Text>
            <Datepicker
              //label='Date of change'
              //placeholder='Pick Date'
              size='small'
              date={date}
              onSelect={nextDate => setDate(nextDate)}
              accessoryRight={CalendarIcon}
            />
            <Divider style={styles.lineStyle} />


            <Text style={styles.textInCard} >Odometer at change:</Text>
            <Input
              placeholder='Odometer at change'
              value={odoInputValue}
              onChangeText={nextOdoValue => setOdoInputValue(nextOdoValue)}
            />
            <Divider style={styles.lineStyle} />

            <Text style={styles.textInCard} >Oil Used:</Text>
            <Input
              placeholder='Oil Used'
              value={oilInputValue}
              onChangeText={nextOilValue => setOilInputValue(nextOilValue)}
            />
            <Divider style={styles.lineStyle} />

            <Text style={styles.textInCard} >Oil Filter /If changed/: </Text>
            <Input
              placeholder='Oil Filter'
              value={oilFilterInputValue}
              onChangeText={nextOilFilterValue => setOilFilterInputValue(nextOilFilterValue)}
            />
            <Divider style={styles.lineStyle} />

            <View style={styles.popUpCardView}>
              <Button style={styles.addBtn}>Add</Button>
              <Button style={styles.cancelBtn} onPress={() => setVisible(false)}>Cancel</Button>
            </View>

          </Card>

        </Modal>






        <KeyboardAwareScrollView style={{ backgroundColor: '#12171C' }} scrollEnabled={true}>
          <Card style={styles.cardStyle} header={Header}>

            <Text >Date Changed: {remainingData.oilChange}</Text>
            <Divider style={styles.lineStyle} />

            <Text>Due Miles: 115000 m</Text>
            <Divider style={styles.lineStyle} />

            <Text>Date Changed: 01/01/2023</Text>
            <Divider style={styles.lineStyle} />

            <Text>Odometer at change: 109000miles</Text>
            <Divider style={styles.lineStyle} />

            <Text>Oil Used: Fuchs Titan Pro 10W40 5l</Text>
            <Divider style={styles.lineStyle} />

            <Text>Oil Filter: K&N 308</Text>
            <Divider style={styles.lineStyle} />
          </Card>

          <Card style={styles.cardStyle} header={Header}>

            <Text >Due Date: 01/01/2023</Text>
            <Divider style={styles.lineStyle} />

            <Text>Due Miles: 109000 m</Text>
            <Divider style={styles.lineStyle} />

            <Text>Date Changed: 01/01/2022</Text>
            <Divider style={styles.lineStyle} />

            <Text>Odometer at change: 103000miles</Text>
            <Divider style={styles.lineStyle} />

            <Text>Oil Used: Castrol Magnatec 10W40 4.5l</Text>
            <Divider style={styles.lineStyle} />

            <Text>Oil Filter: K&N 308</Text>
            <Divider style={styles.lineStyle} />
          </Card>
        </KeyboardAwareScrollView>


        <Button size='giant' onPress={() => setVisible(true)} style={styles.touchableOpacityStyle} accessibilityLabel="Add new vehicle"><AntDesign name="plus" size={45} color="white" /></Button>

      </SafeAreaView>
    </Layout>

  );
}

const styles = StyleSheet.create({
  inner: {
    padding: 5,
    flex: 1,
    //justifyContent: 'space-around',
  },
  cardHeading: {
    position: 'absolute',
    top: 60,
    left: 25
  },
  container: {
    flex: 1,
    backgroundColor: "#12171C",
  },

  insideCard: {
    flex: 1,
    flexDirection: 'row',
  },

  lineStyle: {
    horizontalInset: true,
    margin: 10,
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
    backgroundColor: '#12171C',
  },

  headerLabel: {
    marginTop: 16,
  },

  cardStyle: {
    margin: 10,
    backgroundColor: '#1C3832',
    justifyContent: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  textProba: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  /* touchableOpacityStyle: {
     position: 'absolute',
     width: 50,
     height: 50,
     alignItems: 'center',
     justifyContent: 'center',
     right: 30,
     bottom: 30,
   },*/
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 65,
    height: 65,
    //backgroundColor:'black'
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  popUpCardView: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 300,
  },
  textInCard: {
    marginBottom: 10
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

});