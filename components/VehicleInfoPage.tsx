import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Layout, Text } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import Account from './Account';
import Garage from './Garage';
import UserHome from './UserHome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Tab } from '@ui-kitten/components';


const { Navigator, Screen } = createBottomTabNavigator();




export default function VehicleInfoPage({ navigation }: Props){

    return(
        <Layout style={styles.container}>
            <Layout style={styles.container}>
            <Text>THIS IS THE VEHICLE INFO PAGE</Text>
            <Button>Garage button</Button>
        </Layout>
            
      </Layout>
      
    );

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
    },
    tabBg: {
        backgroundColor: "black",
      },
      signUpButton: {
        marginHorizontal: 16,
      },
});