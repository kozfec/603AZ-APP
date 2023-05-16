import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, ApplicationProvider, Button, Layout, Text, Tab } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import Account from './Account';
import Album from './Album';
import Artists from './Artists';


const { Navigator, Screen } = createBottomTabNavigator();


const BottomTabBar = ({ navigation, state }: Props) => (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title='ARTISTS'/>
      <BottomNavigationTab title='ALBUM'/>
      <BottomNavigationTab title='ACCOUNT'/>
    </BottomNavigation>
  );
  
  const TabNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
      <Screen name='Artists' component={Artists}/>
      <Screen name='Album' component={Album}/>
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
      },
})