import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, ViewProps, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ActivityIndicator, ScrollView} from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Card, Datepicker, Divider, Icon, IconElement, Layout, Text, TopNavigation, Modal, Input, List } from '@ui-kitten/components';
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
import { AntDesign } from '@expo/vector-icons';
import { IOil } from '../interfaces/IOil';
import { Auth } from 'aws-amplify';
import { MaterialIcons } from '@expo/vector-icons'; 




const { Navigator, Screen } = createBottomTabNavigator();




export default function OilManagement({ navigation, route }: Props) {

  //const route1 = useRoute();

  

  const [registration, setRegistration] = useState('');

  const [oil, setOil] = useState<IOil[]>([]);



console.log(oil);

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
      const response = await fetch(`https://y6bhm2g1q1.execute-api.us-east-1.amazonaws.com/oildata/${id}`, {
        headers: {
          "Authorization": idToken,
          "accesstoken": accessToken,
          
          
        }
      });
      const json = await response.json();
      console.log(json)
      if (typeof json.oilChange === 'string') {
        json.OilChange = JSON.parse(json.oilChange);
      }
      setOil(json.OilChange);
      //console.log(setOil);
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

  const [dateString, setDateString] = React.useState(''); //For the calendar

  const [dateCalendar, setDateCalendar] = React.useState(new Date());

  const [visible, setVisible] = React.useState(false); //For the modal visibility

  const [odoInputValue, setOdoInputValue] = React.useState(''); //For the modal input for Odometer reading

  const [oilInputValue, setOilInputValue] = React.useState(''); //For the modal input for oil change

  const [oilFilterInputValue, setOilFilterInputValue] = React.useState('');


  useEffect(() => {
    getOil()
  }, []);


  ////////////////////////////////////////////////////////////      ADD OIL ///////////////////////////////////////////////////////////////

  const [request, setRequest] = useState({
    dateChanged: "",
    mileageChanged: "",
    oilUsed: "",
    oilFilter: "",
  }
  );

  const [data, setData] = useState<IOil>({
    dateChanged: "",
    mileageChanged: "",
    oilUsed: "",
    oilFilter: "",
  });



  const addOilToDatabase = async () => {
    setLoading(true);
    const user = await Auth.currentSession();
    const accessToken = user.getAccessToken().getJwtToken();
    const idToken = user.getIdToken().getJwtToken();
    const oilChange = oil;
    oilChange.push(data);
    try {
      const response = await fetch(`https://y6bhm2g1q1.execute-api.us-east-1.amazonaws.com/oildata/${id}`, {
        headers: {
          "Authorization": idToken,
          "accesstoken": accessToken,
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(oilChange),
      });
      const json = await response.json();
      console.log(json)
      setVisible(false)
    } catch (error) {
      console.error('Failed to olaj:', error);
    }
    finally {
      setLoading(false);
    }
  };


 


  ////////////////////////////////////////////////////////////      ADD OIL ///////////////////////////////////////////////////////////////
  const [keyboardSize, setKeyboardSize] = React.useState(0);

  useEffect(() => {
      Keyboard.addListener("keyboardDidShow", (e) => {
          setKeyboardSize(e.endCoordinates.height)
      })
  
      Keyboard.addListener("keyboardDidHide", (e) => {
          setKeyboardSize(e.endCoordinates.height)
      })
  
      return (() => {
          Keyboard.removeAllListeners("keyboardDidShow");
          Keyboard.removeAllListeners("keyboardDidHide");
      })
  }, [])



  var mileageToAdd = 6000;



  return (


    <Layout style={styles.container}>
      
      <TopNavigation style={styles.barBg} accessoryLeft={BackAction} title={props => <Text {...props}>Oil Management</Text>} alignment='center' />
      {isLoading ? <ActivityIndicator size='large' style={styles.spinner} color="#83AF9F" /> : (
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
          
          <Card 
          style={{marginBottom: keyboardSize,
            backgroundColor: '#1C3832',
            justifyContent: "center",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,}} 
            disabled={true} header={Header2}
          >

            <Text style={styles.textInCard}>Date of change:</Text>
            <Datepicker
              date={dateCalendar}
              accessoryRight={CalendarIcon}
              onSelect={date => {
                const formattedDate = date.toLocaleDateString("en-GB");
                //const formattedDate = date.toLocaleDateString("UTC");
                setDateCalendar(date);
                setDateString(formattedDate);
                setData({ ...request, dateChanged: formattedDate });
              }}
            />
            <Divider style={styles.lineStyle} />


            <Text style={styles.textInCard} >Odometer at change:</Text>
            <Input
              placeholder='Odometer at change'
              inputMode='numeric'
              onChangeText={odoInputValue => setData({ ...data, mileageChanged: odoInputValue})}
            />
            <Divider style={styles.lineStyle} />

            <Text style={styles.textInCard} >Oil Used:</Text>
            <Input
              placeholder='Oil Used'
              onChangeText={oilInputValue => setData({ ...data, oilUsed: oilInputValue})}
              
            />
            <Divider style={styles.lineStyle} />

            <Text style={styles.textInCard} >Oil Filter /If changed/: </Text>
            <Input
              placeholder='Oil Filter'
              onChangeText={oilFilterInputValue => setData({ ...data, oilFilter: oilFilterInputValue})}
            />
            <Divider style={styles.lineStyle} />

           

            <View style={styles.popUpCardView}>
              <Button style={styles.addBtn} onPress={addOilToDatabase}>Add</Button>
              <Button style={styles.cancelBtn} onPress={() => setVisible(false)}>Cancel</Button>
            </View>
          </Card>
          
        </Modal>
        
        


        {oil.length == 0 || !oil ? <Card style={styles.cardStyle} header={Header}>
          <Text>No oil information available. Please use + to add a new oil change.</Text></Card>: (
        <List style={styles.list}
              data={oil}
              // keyExtractor={({ carReg, carMake }, index) => carReg} 
              renderItem={({ item }) => (

                
          <Card style={styles.cardStyle} header={Header}>
          
            <Text >Date due: Date</Text>
            <Divider style={styles.lineStyle} />

            <Text>Due Miles: {parseInt(item.mileageChanged, 10) + mileageToAdd} miles</Text>
            <Divider style={styles.lineStyle} />

            <Text>Date Changed: {item.dateChanged}</Text>
            <Divider style={styles.lineStyle} />

            <Text>Odometer at change: {item.mileageChanged} miles</Text>
            <Divider style={styles.lineStyle} />

            <Text>Oil Used: {item.oilUsed}</Text>
            <Divider style={styles.lineStyle} />

            <Text>Oil Filter: {item.oilFilter}</Text>
            <Divider style={styles.lineStyle} />
          </Card>
          )} 
          />
        )
        
        }
        
        

        <Button size='giant' onPress={() => setVisible(true)} style={styles.touchableOpacityStyle} accessibilityLabel="Add new oil change"><AntDesign name="plus" size={45} color="white" /></Button>
        
      </SafeAreaView>
      )}
    </Layout>

  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#12171C',
  },
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
  spinner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    flex: 1,

  },

});