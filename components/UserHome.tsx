import { StatusBar } from 'expo-status-bar';
import * as eva from '@eva-design/eva';
import { ActivityIndicator, GestureResponderEvent, KeyboardAvoidingView, StyleSheet, View, Image, ViewProps, Pressable } from 'react-native';
import { ApplicationProvider, Avatar, Button, Card, Divider, Input, Layout, List, Modal, Spinner, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { IItem } from '../interfaces/IItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import UserHome_1 from "./UserHome_1";
import { Ionicons } from '@expo/vector-icons';
import VehicleInfoPage from './VehicleInfoPage';
import OilManagement from './OilManagement';
import { AntDesign } from '@expo/vector-icons';
import { AddCarProba } from './AddCarProba';



const Stack = createStackNavigator();

function UserHomeStack() { //sets a stack navigator for the userhome with the following stacks
  return (
    <SafeAreaView style={{ flex: 1 }}> 
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='UserHomeafterLogin' component={UserHomeafterLogin}/>
        <Stack.Screen name='UserHome_1' component={UserHome_1} />
        <Stack.Screen name="VehicleInfoPage" component={VehicleInfoPage}/>
        <Stack.Screen name="OilManagement" component={OilManagement} />
        <Stack.Screen name="AddCarProba" component={AddCarProba} />
      </Stack.Navigator>
    </SafeAreaView>
  )
}


export default function UserHomes({ navigation }: Props) {
  return (
    <UserHomeStack />
  )
}




export function UserHomeafterLogin({ navigation }: Props) {



  const BackAction = (): React.ReactElement => (
    <Ionicons name="arrow-back-sharp" size={25} color="#83AF9F" onPress={() => navigation.navigate('Login')} appearance='ghost' />
  ); //Use the icon variable

  const [isLoading, setLoading] = useState(true);

  const [data, setData] = useState<IItem[]>([]);
  const [car, setCar] = useState<IItem>();



  const getItems = async () => { //function to get items from database
    const user = await Auth.currentSession(); //sets the user variable for the current user using amplify library
    const accessToken = user.getAccessToken().getJwtToken(); //sets accessToken  variable by getting the JWT token from the users accesstoken
    const idToken = user.getIdToken().getJwtToken(); //sets idToken variable by getting the JWT token from the users idtoken
    try {
      const response = await fetch('https://vced01bhu8.execute-api.us-east-1.amazonaws.com/Default/items', {
        headers: { //sets the header
          "Authorization": idToken,
          "accesstoken": accessToken
        }
      });
      const json = await response.json();
      console.log(json);
      setData(json); //sets the data from the returned json
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);


  const navigateAddCar = () => {
    navigation.navigate('AddCarProba')
  };

  const navigateItem = async (item: IItem) => { //sets the paramkey as carreg for the navigation page
      navigation.navigate('UserHome_1', { paramKey: item.carReg })
  }

  

  return (

    <Layout style={styles.container}>

      <TopNavigation style={styles.barBg} accessoryLeft={BackAction} title={props => <Text {...props}>Please select vehicle!</Text>} alignment='center' />

      <SafeAreaView style={{ flex: 1 }}>

        <View style={{ flex: 1 }}>

       
          {isLoading ? (<ActivityIndicator size='large' style={styles.spinner} color="#83AF9F" />) : 
          data.length === 0 ?  (
            
            <Text style={styles.noDataText} >You currently have no cars in your garage. Please add a car using the + button.</Text>
          ) : (
             
            <List style={styles.list}
              data={data}
              // keyExtractor={({ carReg, carMake }, index) => carReg} 
              renderItem={({ item }) => ( 

               

                <TouchableOpacity>
                  <Card style={styles.cardStyle} onPress={() => navigateItem(item)}>
                    <Text style={styles.itemTitle} category='h2' status='control'>{item.carReg}</Text>
                    <Avatar size='giant' style={styles.avatar} source={require('../assets/carVector2.jpg')} />                    
                  </Card>
                </TouchableOpacity>
              )}
            />
           


          )}



          <Button size='giant' onPress={navigateAddCar} style={styles.touchableOpacityStyle} accessibilityLabel="Add new vehicle"><AntDesign name="plus" size={45} color="white" /></Button>

        </View>
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
  noDataText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    marginTop: 20
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
    width: 300,
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
  },
});










function navigateBack(event: GestureResponderEvent): void {
  throw new Error('Function not implemented.');
}

