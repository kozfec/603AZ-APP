import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Input, Layout, Text, ViewPager } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Auth } from 'aws-amplify';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';







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
        <SafeAreaView style= {{flex:1} } >
        <KeyboardAwareScrollView
          style={{ backgroundColor: '#12171C' }}
          scrollEnabled={true}
        >
          <View style= {styles.headerContainer}>
            <Text category='h1'>Green Garage</Text>
            <Text style={styles.signInLabel} category='s1'>
              Sign in to your account
            </Text>
          </View>

          <View style={styles.formContainer}>
            <Input //Email Input
              style={styles.passwordInput}
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
                status='warning'
                onPress={navigateForgotten}>Forgot your password?
              </Button>
            </View>
          </View>
          </KeyboardAwareScrollView>
          <Button
            style={styles.signInButton}
            size='giant'
            onPress={signIn}>Login
            
          </Button>

          <Button
            style={styles.signUpButton}
            //appearance='outline'
            //status='info'
            status='warning'
            size='giant'
            onPress={navigateRegister}>
              Create an account
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
      headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 216,
        backgroundColor: '#12171C',
      },
      formContainer: {
        flex: 1,
        marignTop: 32,
        paddingHorizontal: 10,
        backgroundColor: '#12171C',
      },
      signInLabel: {
        marginTop: 16,
      },
      signInButton: {
        marginVertical: 12,
        marginHorizontal: 16,
        backgroundColor: '#7A823C',
        borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
      },
      signUpButton: {
        marginVertical: 12,
        marginHorizontal: 16,
        backgroundColor: '#1C3832',
        //backgroundColor: '#195253',
        borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
      },
      forgotPasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
      passwordInput: {
        marginTop: 16,
        backgroundColor:'#181E28'
      },
      forgotPasswordButton: {
        paddingHorizontal: 0,
      },
});