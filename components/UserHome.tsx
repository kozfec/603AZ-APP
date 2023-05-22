import { StatusBar } from 'expo-status-bar';
import * as eva from '@eva-design/eva';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { ApplicationProvider, Button, Card, Input, Layout, List, Spinner, Text, TopNavigation } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import VehicleInfoPage from './VehicleInfoPage';
import { IItem } from '../interfaces/IItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import UserHome_1 from "./UserHome_1";


const Stack = createStackNavigator();

function UserHomeStack() {
  

  return (
    <Stack.Navigator>
      <Stack.Screen name='UserHome' component={LoadUserHome} />
      <Stack.Screen name='UserHome_1' component={UserHome_1} />
    </Stack.Navigator>
  )

}
export default function UserHomes({navigatio}: Props) {
  return (
    <UserHomeStack/>
  )
}


export function LoadUserHome ({ navigation }: Props) {

  const arrowCharacter = '<'; //Creates a variable so the < character can be used in text.
  const BackAction = (): React.ReactElement => (
    <Button onPress={() => navigation.navigate('Login')} appearance='ghost'>{arrowCharacter} Log out</Button>
  );
  ///////////////////////////////////////////////////////////////////////////// from react native networking
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<IItem[]>([]);

  const getItems = async () => {
    try {
      const response = await fetch('https://yt41qm05o8.execute-api.us-east-1.amazonaws.com/Default/items');
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



 /* const navigateVehicleInfoPage = () => {
    navigation.navigate('VehicleInfoPage')
  };*/

  const navigateItem = (item: IItem) => {
    navigation.navigate('UserHome_1', {paramKey: item.carMake})
  }

  return (
    <Layout style={styles.container}>
      <TopNavigation style={styles.barBg} title={props => <Text {...props}>Smart Car App</Text>} alignment='center' />
      <View style={{ flex: 1 }}>
        {isLoading ? <Spinner style={styles.spinner} status='primary' /> : (
          <List style={styles.list} 
          data={data} 
         // keyExtractor={({ carMake, carModel }, index) => carMake} 
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Card style={styles.cardStyle}
                onPress={() => navigateItem(item)}>
                <View >
                  <Text style={styles.itemTitle} category='h2' status='control'>{item.carMake}</Text>
                  <Text style={styles.itemDescription} category='s1' status='control'>
                    {item.carModel}
                  </Text>
                </View>
              </Card>
          </TouchableOpacity>
          )}
          />
        )}
      </View>
    </Layout>
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
  spinner: {
    alignSelf: 'center',
  },
  cardStyle: {
    height: 220,
    marginBottom: 4,
    backgroundColor: 'red'
  },
  cardBackground: {
    flex: 1,
    backgroundColor: 'red',
  },
  itemTitle: {
    zIndex: 1,
  },
  itemDescription: {
    zIndex: 1,
    marginVertical: 16,
  },
  list: {
    backgroundColor: 'black'
  }
});













/*  <Layout style={styles.container}>

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
});*/