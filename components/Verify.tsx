import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Input, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import { useState } from 'react';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Verify({ navigation }: Props){

  const [username, setUsername] = useState('');
  const [authCode, setAuthCode] = useState('');


  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, authCode);
      console.log('Code confirmed');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Verification code does not match. Please enter a valid verification code.', error);
    }    
  }




    return(
        <Layout style={styles.container}>
          <SafeAreaView style= {{flex:1}}>
          <TopNavigation style={styles.barBg} title={props => <Text {...props}>VaporAudio</Text>} alignment='center' />
          <View style= {styles.headerContainer}>
            <Text category='h1'>
                Thanks for registering
            </Text>
            <Text category='s1'>
              Check your email to retrieve your verification code.
              To verify, enter your email and verification code to complete registration.
            </Text>
          </View>
          <KeyboardAvoidingView style= {styles.formContainer} behavior="height">
            <Input
              placeholder='Email'
              value={username}
              onChangeText= {text => setUsername(text)}
              autoCapitalize='none'
              inputMode='email'
              />
              <Input
                placeholder='Verification code'
                value={authCode}
                onChangeText={text => setAuthCode(text)}
                autoCapitalize='none'
                inputMode='numeric'
                />
          </KeyboardAvoidingView>
          <Button 
          style= {styles.signUpButton}
          status='success'
          size='giant'
          onPress={confirmSignUp}>
            VERIFY ACCOUNT
          </Button>
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
    },
    headerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 170,
    },
    formContainer: {
      flex: 1,
      paddingTop: 32,
      paddingHorizontal: 16,
    },
    formInput: {
      marginTop: 16,
    },
    termsCheckBoz: {
      marginTop: 24,
    },
    termsCheckBox: {
      color: 'white',
    },
    termsCheckBoxText: {
      color: 'white',
    },
    signUpButton: {
      marginHorizontal: 16,
    },
    signInButton: {
      marginVertical: 12,
      marginHorizontal: 16,
    },
});