import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, ApplicationProvider, Button, Layout, Text, Tab, IconElement, Icon } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import Account from './Account';
import UserHome from './UserHome';



const { Navigator, Screen } = createBottomTabNavigator();  //returns an object with navigator and screen properties


const BottomTabBar = ({ navigation, state }: Props) => ( //renders the bottom navigator with the following settings
    <BottomNavigation
      style={styles.tabBg}
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}> 
      <BottomNavigationTab title='HOME'/>      
      <BottomNavigationTab title='ACCOUNT'/>
    </BottomNavigation>
  );
  
  const TabNavigator = () => ( //to set the bottom navigator
  <SafeAreaView style={{ flex: 1 }}> 
    <Navigator initialRouteName='UserHome'  screenOptions={{ headerShown: false }} tabBar={props => <BottomTabBar {...props}/>}> 
      <Screen name='UserHome' component={UserHome} />
      <Screen name='Account' component={Account}/>
    </Navigator></SafeAreaView>
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
      backgroundColor: "#12171C",
      },
      tabBg: {
        backgroundColor: "#181E28",
      },
});