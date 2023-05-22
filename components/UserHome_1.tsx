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

export default function UserHome_1({ navigation, route }: Props) {

    const id= route.params.paramKey;
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState<IItem>({
        carMake: "",
        carModel: "",
        carRegistration: ""
    });
  
    const getItem = async () => {
      try {
        const response = await fetch(`https://yt41qm05o8.execute-api.us-east-1.amazonaws.com/Default/items/${id}`);
        const json = await response.json();
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
            <Text>{data.carModel}</Text>
            <Text>{data.carRegistration}</Text>
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
    },
    itemDescription: {
      zIndex: 1,
      marginVertical: 16,
    },
    list: {
      backgroundColor: 'black'
    }
});
