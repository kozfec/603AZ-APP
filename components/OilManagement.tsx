import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, ViewProps, Image, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ActivityIndicator, ScrollView } from 'react-native';
import { ApplicationProvider, Button, Card, Datepicker, Divider, Icon, IconElement, Layout, Text, TopNavigation, Modal, Input, List } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { IItem } from '../interfaces/IItem';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { IOil } from '../interfaces/IOil';
import { Auth } from 'aws-amplify';
import { MaterialIcons } from '@expo/vector-icons';



export default function OilManagement({ navigation, route }: Props) {


  const [registration, setRegistration] = useState('');

  const [oil, setOil] = useState<IOil[]>([]); // sets the oil inteface for the added array

  const [isLoading, setLoading] = useState(true); //sets the spinner 

  const remainingData = route.params?.remainingData;  //retrieve the data from the route parameters basically gets the data passed by another page (the car info is the passed data (carreg, carmodel, make etc))

  if (!remainingData) { //in case the remaining data not available sets an error message
    return (
      <Layout style={styles.container}>
        <View style={styles.headerContainer} >
          <Text>Sorry, your vehicle information currently unavailable </Text>
        </View>
      </Layout>
    );
  }

  const id = remainingData.carReg; //gets the car reg from the above set remaining data


  const getOil = async () => { //get oil function
    try {
      console.log(id);
      const user = await Auth.currentSession(); //gets the current user and sets it to the user variable
      const accessToken = user.getAccessToken().getJwtToken(); //sets accessToken  variable by getting the JWT token from the users accesstoken
      const idToken = user.getIdToken().getJwtToken(); //sets idToken  variable by getting the JWT token from the users idtoken
      //const response = await fetch(`https://y6bhm2g1q1.execute-api.us-east-1.amazonaws.com/oildata/${id}`, { //Api route
      const response = await fetch(`https://vced01bhu8.execute-api.us-east-1.amazonaws.com/Default/oildata/${id}`, {
      
        headers: {
          "Authorization": idToken, //sets the headers as its required to be sent
          "accesstoken": accessToken,
        }
      });
      const json = await response.json(); //sets the json that it gets from the response json
      console.log(json)
      if (typeof json.oilChange === 'string') {  //if the oil change is string then it sets it to json
        json.OilChange = JSON.parse(json.oilChange);
      }
      setOil(json.OilChange); //sets the state variable above described
    } catch (error) {
      console.log("Hiba can:", error); //in case there is an error 
    } finally {
      setLoading(false); //turns the spinner off
    }
  };

  const navigateItem = (item: IItem) => { //navigate item function, passes the car reg as item to the userhome page, it'll be used for the navigate back icon on the navbar
    navigation.navigate('UserHome_1', { paramKey: item.carReg })
  }

  const BackAction = (): React.ReactElement => ( //creates the back action icon for the navbar
    <Ionicons name="arrow-back-sharp" size={25} color="#83AF9F" onPress={() => navigateItem(remainingData.carReg)} appearance='ghost' />
  ); //For the nav bar icon

  const Header = (): React.ReactElement => ( //header for the cards
    <View style={styles.textProba}>
      <Text category='h6'>
        Oil Change History
      </Text>
    </View>
  ); //For the card heading

  const Header2 = (): React.ReactElement => ( //header for the pop up 
    <View style={styles.textProba}>
      <Text category='h6'>
        Add new oil change
      </Text>
    </View>
  );

  const CalendarIcon = (): IconElement => ( //icon for the calendar icon
    <FontAwesome name="calendar-plus-o" size={24} color="black" />
  );

  const [dateString, setDateString] = React.useState(''); //For the calendar to be set as string once date provided

  const [dateCalendar, setDateCalendar] = React.useState(new Date()); //for the calendar to sets the state variable for the set date used on the calendra

  const [visible, setVisible] = React.useState(false); //For the modal visibility



  useEffect(() => { //fetches the oil data when the page open
    getOil()
  }, []);


  ////////////////////////////////////////////////////////////      ADD OIL ///////////////////////////////////////////////////////////////

  const [request, setRequest] = useState({ //statevariable only because of the date to be set
    dateChanged: "",
    mileageChanged: "",
    oilUsed: "",
    oilFilter: "",
  }
  );

  const [data, setData] = useState<IOil>({ //sets teh statevariable to store the following data
    dateChanged: "",
    mileageChanged: "",
    oilUsed: "",
    oilFilter: "",
  });

  const addOilToDatabase = async () => { //function to add oil to database
    setLoading(true);
    const user = await Auth.currentSession(); //sets the user variable for the current user using amplify library
    const accessToken = user.getAccessToken().getJwtToken(); //sets accessToken  variable by getting the JWT token from the users accesstoken
    const idToken = user.getIdToken().getJwtToken(); //sets idToken variable by getting the JWT token from the users idtoken
    const oilChange = oil; //assigns the value of state variable above
    oilChange.push(data); //adds the data to the oilchange array
    try {
      //const response = await fetch(`https://y6bhm2g1q1.execute-api.us-east-1.amazonaws.com/oildata/${id}`, { //api route
      const response = await fetch(`https://vced01bhu8.execute-api.us-east-1.amazonaws.com/Default/oildata/${id}`, { //api route
        headers: { //sets the headers as its required to be sent for auth
          "Authorization": idToken,
          "accesstoken": accessToken,
          'Content-Type': 'application/json'
        },
        method: "POST", //the method for the database to add the data
        body: JSON.stringify(oilChange), // sets the body to be a json string
      }); 
      const json = await response.json(); //waits for the response
      console.log(json)
      setVisible(false) //disables the modal
    } catch (error) {
      console.error('Failed to olaj:', error); //catches error
    } 
    finally {
      setLoading(false); //turns off the spinner
    }
  };





  ////////////////////////////////////////////////////////////      ADD OIL ///////////////////////////////////////////////////////////////
  const [keyboardSize, setKeyboardSize] = React.useState(0); //For the modal to not be hided behind the keyboard

  useEffect(() => { //For the modal to not be hided behind the keyboard
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
  }, []) //For the modal to not be hided behind the keyboard



  var mileageToAdd = 6000; //adds mileage to the provided mileage

  const dateUntill = Date.parse(data.dateChanged) //not yet working but tries to add a year to the date


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
              style={{
                marginBottom: keyboardSize,
                backgroundColor: '#1C3832',
                justifyContent: "center",
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                borderBottomLeftRadius: 25,
                borderBottomRightRadius: 25,
              }}
              disabled={true} header={Header2}
            >
              <Text style={styles.textInCard}>Date of change:</Text>
              <Datepicker
                date={dateCalendar}
                accessoryRight={CalendarIcon}
                onSelect={date => {
                  //const formattedDate = date.toLocaleDateString("en-GB");
                  const formattedDate = date.toLocaleDateString("UTC");
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
                onChangeText={odoInputValue => setData({ ...data, mileageChanged: odoInputValue })}
              />
              <Divider style={styles.lineStyle} />

              <Text style={styles.textInCard} >Oil Used:</Text>
              <Input
                placeholder='Oil Used'
                onChangeText={oilInputValue => setData({ ...data, oilUsed: oilInputValue })}
              />
              <Divider style={styles.lineStyle} />

              <Text style={styles.textInCard} >Oil Filter /If changed/: </Text>
              <Input
                placeholder='Oil Filter'
                onChangeText={oilFilterInputValue => setData({ ...data, oilFilter: oilFilterInputValue })}
              />
              <Divider style={styles.lineStyle} />
              
              <View style={styles.popUpCardView}>
                <Button style={styles.addBtn} onPress={addOilToDatabase}>Add</Button>
                <Button style={styles.cancelBtn} onPress={() => setVisible(false)}>Cancel</Button>
              </View>
            </Card>
          </Modal>




          {oil.length === 0 || !oil ? 
            <Text style={styles.noDataText}>No oil information available for this vehicle. Please use + to add a new oil change.</Text> : (
            <List style={styles.list}
              data={oil}
              // keyExtractor={({ carReg, carMake }, index) => carReg} 
              renderItem={({ item }) => (


                <Card style={styles.cardStyle} header={Header}>

                  <Text >Date due: Date {dateUntill}</Text>
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
  noDataText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    marginTop: 20
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