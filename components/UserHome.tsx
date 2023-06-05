import { StatusBar } from 'expo-status-bar';
import * as eva from '@eva-design/eva';
import { ActivityIndicator, GestureResponderEvent, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { ApplicationProvider, Avatar, Button, Card, Input, Layout, List, Spinner, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
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


const Stack = createStackNavigator();

function UserHomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='UserHomeafterLogin' component={UserHomeafterLogin} />
      <Stack.Screen name='UserHome_1' component={UserHome_1} />
      <Stack.Screen name = "VehicleInfoPage" component={VehicleInfoPage}/>
    </Stack.Navigator>
  )
}


export default function UserHomes({navigation}: Props) {
  return (
    <UserHomeStack/>
  )
}

//const auth.signOut <---call function for sign out

export function UserHomeafterLogin ({ navigation }: Props) {


  const probaIcon = <Ionicons name="arrow-back-sharp" size={25} color="black" /> //Create a Icon variable
  const BackAction = (): React.ReactElement => (
    <Ionicons name="arrow-back-sharp" size={25} color="#83AF9F" onPress={() => navigation.navigate('Login')}  appearance='ghost'/> 
  ); //Use the icon variable



  ///////////////////////////////////////////////////////////////////////////// from react native networking
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<IItem[]>([]);

  const getItems = async () => {
    try {
      const response = await fetch('https://0v05jnucib.execute-api.us-east-1.amazonaws.com/Default/items');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getItems();
  }, []);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////
 


  const navigateItem = (item: IItem) => {
    navigation.navigate('UserHome_1', {paramKey: item.carReg})
  }

  return (
   
    <Layout style={styles.container}>
      <TopNavigation style={styles.barBg} accessoryLeft={BackAction}  title={props => <Text {...props}>Please select vehicle!</Text>} alignment='center' />
       <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>

       

        {isLoading ? <ActivityIndicator size= 'large' style={styles.spinner}  color="#83AF9F"/> : (
          <List style={styles.list} 
          data={data} 
         // keyExtractor={({ carReg, carMake }, index) => carReg} 
          renderItem={({ item }) => (
            
            <TouchableOpacity>
              

              <Card style={styles.cardStyle}
                onPress={() => navigateItem(item) }
              >
                
                
                  
                  
                    
                    <Text style={styles.itemTitle} category='h2' status='control'>{item.carReg}</Text>
                     <Avatar size='giant' style={styles.avatar} source={require('../assets/carVector2.jpg')} /> 
                    <Text style={styles.itemDescription} category='s1' status='control'>{item.carMake}</Text>
                    
                    
                      
                 
                 

                

              </Card>
          </TouchableOpacity>
          )}
          />
        )}
        
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
    backgroundColor:'#12171C',
    marginBottom: 20,
  },
});










function navigateBack(event: GestureResponderEvent): void {
  throw new Error('Function not implemented.');
}

