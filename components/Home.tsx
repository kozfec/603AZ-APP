import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, ApplicationProvider, Button, Layout, Text, Tab } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import Account from './Account';
import Garage from './Garage';
import UserHome from './UserHome';


const { Navigator, Screen } = createBottomTabNavigator();


const BottomTabBar = ({ navigation, state }: Props) => (
    <BottomNavigation
      style={styles.tabBg}
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title='MY GARAGE'/>
      <BottomNavigationTab title='HOME'/>      
      <BottomNavigationTab title='ACCOUNT'/>
    </BottomNavigation>
  );
  
  const TabNavigator = () => (
    <Navigator initialRouteName='UserHome' tabBar={props => <BottomTabBar {...props} />}>
      <Screen name='My garage' component={Garage}/>
      <Screen name='UserHome' component={UserHome}/>
      <Screen name='Account' component={Account}/>
    </Navigator>
  );


export default function Home({ navigation }: Props){
    return(
        <Layout style={styles.container}>
            <TabNavigator/>
      </Layout>      
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "black",
      },
      tabBg: {
        backgroundColor: "#046E5E",
      },
      signUpButton: {
        marginHorizontal: 16,
      },
});