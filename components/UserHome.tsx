import { StatusBar } from 'expo-status-bar';
import * as eva from '@eva-design/eva';
import { ActivityIndicator, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { ApplicationProvider, Button, Card, Input, Layout, List, Spinner, Text, TopNavigation } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { IItem } from '../interfaces/IItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import UserHome_1 from "./UserHome_1";


const Stack = createStackNavigator();

function UserHomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='UserHomeafterLogin' component={UserHomeafterLogin} />
      <Stack.Screen name='UserHome_1' component={UserHome_1} />
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

  const arrowCharacter = '<'; //Creates a variable so the < character can be used in text.
  const BackAction = (): React.ReactElement => (
    <Button onPress={() => navigation.navigate('Login')} appearance='ghost'>{arrowCharacter} Log out</Button>
  );
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
      <TopNavigation style={styles.barBg} title={props => <Text {...props}>Welcome User</Text>} alignment='center' />
      <View style={{ flex: 1 }}>
        {isLoading ? <ActivityIndicator size= 'large' style={styles.spinner}  color="#83AF9F"/> : (
          <List style={styles.list} 
          data={data} 
         // keyExtractor={({ carReg, carMake }, index) => carReg} 
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Card style={styles.cardStyle}
                onPress={() => navigateItem(item)}>
                <View >
                  <Text style={styles.itemTitle} category='h2' status='control'>{item.carReg}</Text>
                  <Text style={styles.itemDescription} category='s1' status='control'>
                    {item.carMake}
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
    height: 220,
    marginBottom: 4,
    backgroundColor: '#1C3832'
  },
  cardBackground: {
    flex: 1,
    backgroundColor: '#1C3832',
  },
  itemTitle: {
    zIndex: 1,
    color: 'white'
  },
  itemDescription: {
    zIndex: 1,
    marginVertical: 16,
    color: 'white'
  },
  list: {
    backgroundColor: '#12171C'
  }
});










