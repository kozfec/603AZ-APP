import { SafeAreaView, StyleSheet, View, } from 'react-native';
import { Button, Card, Divider, Layout, Text, TopNavigation } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Auth } from 'aws-amplify';


export default function Account({ navigation }: Props){


  const BackAction = (): React.ReactElement => ( //Icon button for the navbar
    <Ionicons name="arrow-back-sharp" size={25} color="#83AF9F" onPress={() => navigation.navigate('UserHome')}  appearance='ghost'/>
  );

  const Header = (): React.ReactElement => ( //Header for the cars
    <View style={styles.textProba}>
      <Text category='h6'>
        User details
      </Text>
    </View>
  );
 

async function signOut() {  //Sign out function
  try {
    await Auth.signOut();  //Revoke cognito token so cannot generate new Access and Id Tokens
    navigation.navigate('Login'); //Navigates back to the Login page
  } catch (error) {
    console.log('error signing out: ', error);
  }
}

    return(
        <Layout style={styles.container}>
        <TopNavigation style={styles.barBg} accessoryLeft={BackAction}  title={props => <Text {...props}>Account</Text>} alignment='center' />
        <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView style={{ backgroundColor: '#12171C' }} scrollEnabled={true}>
        <View style={styles.headerContainer} >
            <Text category='h2'>Hello, User!</Text>
        
        </View>
        <Card style={styles.cardStyle} header={Header}>
                
              <Text >Email: fakeuser@fakemail.com</Text>              
              <Divider style={styles.lineStyle}/>
              
              <Text>User Name: Jon Doe</Text>
              <Divider style={styles.lineStyle}/>

              <Text>Password: ***********</Text>
        </Card>
        <Button style={styles.signInButton} size='giant'>Reset Password</Button>

        <Button style={styles.signUpButton}  onPress={signOut}  size='giant'>Log Out</Button>

        <Button style={styles.deleteButton}  size='giant'>Delete Account</Button>

        </KeyboardAwareScrollView>
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
    backgroundColor: "#181E28",
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#12171C',
    marginTop: 20,
  },
  cardStyle: {
    margin: 10,
    backgroundColor: '#1C3832',
    justifyContent:"center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  lineStyle:{
    horizontalInset: true,
    margin:10,
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
    marginBottom: 90,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  deleteButton: {
    marginVertical: 12,
    marginHorizontal: 16,
    backgroundColor: '#B71314',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  textProba: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,    
  },
});