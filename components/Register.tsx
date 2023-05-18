import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import { useState } from 'react';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Register({ navigation }: Props){

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');


  const BackAction = (): React.ReactElement => (
    <Button onPress={() => navigation.navigate('Login')} appearance='ghost'>Back</Button>
   );

   async function signUp() {
    try {
      const email = username;
      await Auth.signUp({username, password, attributes: {name , email}});
      console.log('Sign-up Confirmed');
      navigation.navigate('Verify');
    } catch (error) {
      console.log('Error signing up', error);
    }    
   }







    return(
        <Layout style={styles.container}>
          <SafeAreaView style={{ flex: 1 }}>

            <TopNavigation style={styles.barBg} accessoryLeft={BackAction} title={props => <Text {...props}>VaporAudio</Text>} alignment='center' />
          </SafeAreaView>
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
  }
});