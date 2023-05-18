import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Input, Layout, Text, ViewPager } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Auth } from 'aws-amplify';







export default function Login({ navigation }: Props){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const currentUser = () => {
      Auth.currentAuthenticatedUser()
      .then(user => {
        console.log("USER", user);
        navigation.navigate("Home");
      })
      .catch(err => {
        console.log("ERROR", err);
      })
    };

    currentUser();

    async function signIn() {
      try {
        await Auth.signIn(email, password);
        console.log("Success");
        navigation.navigate('Home');
      } catch(error) {
        console.log('Error signing in...', error);
      }
    }
    





    
    const toggleSecureEntry = () => {
      setSecureTextEntry(!secureTextEntry);
    };

    const navigateForgotten = () => {
      navigation.navigate('Forgot')
    };

    const navigateRegister = () => {
      navigation.navigate("Register");
    };

    


    return(
      <Layout style={styles.container}>
        <SafeAreaView style= {{flex:1}}>
          <View style= {styles.headerContainer}>
            <Text category='h1'>CarSmart App</Text>
            <Text style={styles.signInLabel} category='s1'>
              Sign in to your account
            </Text>
          </View>

          <View style={styles.formContainer}>
            <Input //Email Input
              placeholder='Email'
              value={email}
              onChangeText={(text) => setEmail(text)}
              autoCapitalize='none'
              inputMode='email'
            />

            <Input //Password Input
              style={styles.passwordInput}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder='Password'
              secureTextEntry={secureTextEntry}
              autoCapitalize='none'
              autoCorrect={false}
            />
            <View style = {styles.forgotPasswordContainer}>
              <Button
                style={styles.forgotPasswordButton}
                appearance='ghost'
                status='basic'
                onPress={navigateForgotten}>Forgot your password?
              </Button>
            </View>
          </View>
          <Button
            style={styles.signInButton}
            size='giant'
            onPress={signIn}>Login
          </Button>

          <Button
            style={styles.signUpButton}
            status='basic'
            size='giant'
            onPress={navigateRegister}>
              CREATE AN ACCOUNT
          </Button>

        </SafeAreaView>
      </Layout>
      /*
        <Layout style={styles.container}>
        <Text>Login Page"</Text>
        <Button onPress={() => navigation.navigate('Home')}>Go Home</Button>
        <Button onPress={() => navigation.navigate('Forgot')}>Forgot Password</Button>
        <Button onPress={() => navigation.navigate('Verify')}>Verify</Button>
        <Button onPress={() => navigation.navigate('Register')}>Register</Button>
      </Layout> */
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
      },
      headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 216,
      },
      formContainer: {
        flex: 1,
        marignTop: 32,
        paddingHorizontal: 10,
      },
      signInLabel: {
        marginTop: 16,
      },
      signInButton: {
        marginVertical: 12,
        marginHorizontal: 16,
      },
      signUpButton: {
        marginVertical: 12,
        marginHorizontal: 16,
      },
      forgotPasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      passwordInput: {
        marginTop: 16,
      },
      forgotPasswordButton: {
        paddingHorizontal: 0,
      },
});