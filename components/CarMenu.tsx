/*import { StatusBar } from 'expo-status-bar';
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

export default function CarMenu({ navigation, route }: Props) {

    const id= route.params.paramKey;
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
          carColor: '',
        },
        carYear: '',
    });
  
    const getItem = async () => {
      try {
        const response = await fetch(`https://0v05jnucib.execute-api.us-east-1.amazonaws.com/Default/items/${id}`);
        const json = await response.json();
        json.carInformation = JSON.parse(json.carInformation);
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

    return(
        <Layout style={styles.container}>
            <Text style={styles.itemDescription} category='s1' status='control'>{data.carReg}</Text>
            <Text style={styles.itemDescription} category='s1' status='control'>{data.carMake}</Text>
            <Text style={styles.itemDescription} category='s1' status='control'>{data.carModel}</Text>
            <Text style={styles.itemDescription} category='s1' status='control'>{data.carInformation.driveTrain}</Text>
        </Layout>

    )
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
      color: 'white',
    },
    itemDescription: {
      zIndex: 1,
      marginVertical: 16,
      color: 'white',
    },
    list: {
      backgroundColor: 'black'
    }
});
*/