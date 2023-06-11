import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Input, Layout, Text, TopNavigation, Icon, IconElement, } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import { useState } from 'react';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Register({ navigation }: Props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false)


 /* let arrowCharacter = '<'; //Creates a variable so the < character can be used in text.
  const BackAction = (): React.ReactElement => (
    <Button onPress={() => navigation.navigate('Login')} appearance='ghost' status='warning'>{arrowCharacter} Back</Button>
  );
  */

  const navigateLogin = () => {
    navigation.goBack()
  };
  //////////////////////////////////////////////////
  const renderCaption = (): React.ReactElement => { //Adds a caption underneath the password textinput specifying password requirements for usability purposes.
    return (
      <View style={styles.captionContainer}>
        <Text style={styles.captionText}>
          The password must contain at least 8 characters, a number, a special character and an uppercase letter!
        </Text>
      </View>
    );
  };
  /////////////////////////////////////////////////

  async function signUp() {
    try {
      const email = username;
      await Auth.signUp({ username, password, attributes: { name, email } });
      console.log('Sign-up Confirmed');
      navigation.navigate('Verify');
    } catch (error) {
      console.log('Error signing up', error);
    }
  }







  return (
    <Layout style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          style={{ backgroundColor: '#12171C' }}
          scrollEnabled={true}
        >
          <TopNavigation style={styles.barBg} /*accessoryLeft={BackAction}*/ title={props => <Text {...props}></Text>} alignment='center' />

          <View style={styles.headerContainer}>
            <Text
              category='h1'>
              Green Garage
            </Text>
            <Text category='s2'>
              Please register your account before you start!
            </Text>
          </View>
          <View style={styles.formContainer}>
            <Input
              style={styles.formInput}
              autoCapitalize='none'
              placeholder='User name'
              value={name}
              onChangeText={text => setName(text)}
            />

            <Input
              style={styles.formInput}
              autoCapitalize='none'
              placeholder='Email'
              value={username}
              onChangeText={text => setUsername(text)}
              keyboardType='email-address'
              textContentType='emailAddress'

            />
            <Input
              style={styles.formInput}
              autoCapitalize='none'
              secureTextEntry={!passwordVisible}
              placeholder='Password'
              caption={renderCaption}
              value={password}
              onChangeText={text => setPassword(text)}
            />
          </View>
        </KeyboardAwareScrollView>
        <Button
          style={styles.signUpButton}
          size='giant'
          onPress={signUp}>
          Sign Up
        </Button>
        <Button
          style={styles.signInButton}
          status='warning'
          onPress={navigateLogin}>
          Already have an account? Sign In
        </Button>
      </SafeAreaView>
    </Layout>

  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12171C",
  },
  barBg: {
    backgroundColor: "#12171C"
  },

  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 170,
    backgroundColor:'#12171C'
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: '#12171C',
  },
  formInput: {
    marginTop: 16,
    backgroundColor:'#181E28',
  },
  signUpButton: {
    marginHorizontal: 16,
    backgroundColor: '#7A823C'
  },
  signInButton: {
    marginVertical: 12,
    marginHorizontal: 16,
    backgroundColor: '#1C3832'
  },
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#12171C',
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'sans-serif',
    color: '#8F9BB3',
  },
});