import { StatusBar } from 'expo-status-bar';
import * as eva from '@eva-design/eva';
import { KeyboardAvoidingView, StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import { ApplicationProvider, Avatar, Button, Card, Input, Layout, List, Spinner, Text, TopNavigation } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import React, { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import VehicleInfoPage from './VehicleInfoPage';
import { IItem } from '../interfaces/IItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { ImageBackground } from 'react-native';
import OilManagement from './OilManagement';


export default function UserHome_1({ navigation, route }: Props) {
 
    const id= route.params.paramKey; //takes the value of paramkey and sets it to id (the car reg)
  

    const [isLoading, setLoading] = useState(true); //for the spinner
    
    const [data, setData] = useState<IItem>({ //state variable for the item interface to be set 
        carReg: "",
        carMake: "",
        carModel: "",
        carYear: "",
        carInformation: {
          dryWeight: "",
          fuelType: "",
          enginePower: "",
          engineSize: "",
          driveTrain: "",
          carColor: "",
        }
    }
    );   



  
    const getItem = async () => { //function to get the data 
       
      try {
        const user = await Auth.currentSession(); //sets the user variable for the current user using amplify library
        const accessToken = user.getAccessToken().getJwtToken(); //sets accessToken  variable by getting the JWT token from the users accesstoken
        const idToken = user.getIdToken().getJwtToken(); //sets idToken variable by getting the JWT token from the users idtoken
        const response = await fetch(`https://y6bhm2g1q1.execute-api.us-east-1.amazonaws.com/carinfo/${id}`,{ //api route
          headers: { //sets the headers as its required for auth
            "Authorization": idToken,
            "accesstoken": accessToken,
          }
          
        });
        const json = await response.json();
        console.log(json);
        json.carInformation = JSON.parse(json.carInformation); //turns to returned data to a json
        setData(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };    
  
    useEffect(() => {
      getItem();
    }, []);

    const navigateVehicleInfoPage = () => { 
      navigation.navigate('VehicleInfoPage', { remainingData: data });
    };//This will navigate to the VehicleInfoPage and pass the remainingData from the carInformation
    // So it doesnt hit the APi again in the VehicleInfoPage

    const navigateOilManagement= () => {
      navigation.navigate('OilManagement', { remainingData: data });
    };//This will navigate to the VehicleInfoPage and pass the remainingData from the carInformation
    // So it doesnt hit the APi again in the VehicleInfoPage


    const probaIcon = <Ionicons name="arrow-back-sharp" size={25} color="black" /> //Create a Icon variable
    const BackAction = (): React.ReactElement => (
    <Ionicons name="arrow-back-sharp" size={25} color="#83AF9F" onPress={() => navigation.navigate('UserHomeafterLogin')}  appearance='ghost'/>
    );


//In the header container text the code checks if the properties are defined and truthy and then it displays it
//If not then it returns an empty string in between the '' (can be an error message)
//Just to use the {data.carMake}{data.carModel} does not work because the carModel is not defined it has the question mar
//which means that it nem muszaj meghatarozni.


    return(
        <Layout style={styles.container}>          
        <TopNavigation style={styles.barBg} accessoryLeft={BackAction}  title={props => <Text {...props}>Manage Your Car</Text>} alignment='center' />
        <SafeAreaView style={{ flex: 1 }}>
        {isLoading ? <ActivityIndicator size='large' style={styles.spinner} color="#83AF9F" /> : (
        <KeyboardAwareScrollView style={{ backgroundColor: '#12171C' }} scrollEnabled={true}>
        
          <View style={styles.headerContainer} >
            <Text category='h1'>{data.carMake ? data.carMake : ''} {data.carModel ? data.carModel : ''}</Text>
            <Text style={styles.headerLabel} category='s1'>
              {data.carReg}
            </Text>
          </View>

          <View style={styles.avatarContainer} >



          <Image source={require('../assets/carVector2.jpg')}
       style={{width: 350, height: 200}} />
            
          
          </View>


          <TouchableOpacity>
            <Card style={styles.cardStyle} onPress={navigateVehicleInfoPage} >
              <Text  category='h4' status='control'>Vehicle Specification</Text>
            </Card>
          </TouchableOpacity>

          <TouchableOpacity>
            <Card style={styles.cardStyle} onPress={navigateOilManagement}>
              <Text  category='h4' status='control'>Engine Oil Management</Text>
            </Card>
          </TouchableOpacity>
          
            
        </KeyboardAwareScrollView>
        )}
        </SafeAreaView>   
        </Layout>

    )
}
const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    flex: 0.3
  },

  avatar: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'stretch'
    
    
  },
    container: {
      flex: 1,
      backgroundColor: "#12171C",
    },
    barBg: {
      backgroundColor: "#181E28"
    },
    headerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      //minHeight: 216,
      backgroundColor:'#12171C',
    },
    btnButton: {
      marginVertical: 12,
      marginHorizontal: 16,
      backgroundColor: '#1C3832',
      //backgroundColor: '#195253'
    },
    headerLabel: {
    marginTop: 16,
    },
    spinner: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
      flex: 1,
    },
    cardStyle: {
      height: 130,
      marginBottom: 4,
      margin: 14,
      backgroundColor: '#1C3832',
      justifyContent:"center",
      alignItems:"center",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    itemTitle: {
      zIndex: 1,
      color: 'white',
      alignContent: 'center'
      
    },
    itemDescription: {
      zIndex: 1,
      marginVertical: 16,
      color: 'white',
    },
    list: {
      backgroundColor: 'black'
    },
    textStyle: {
      backgroundColor:'#83AF9F'
    }
});
