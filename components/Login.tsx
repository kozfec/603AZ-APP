import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Layout, Text } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';

export default function Login({ navigation }: Props){

    return(
        <Layout style={styles.container}>
        <Text>Login Page"</Text>
        <Button onPress={() => navigation.navigate('Home')}>Go Home</Button>
        <Button onPress={() => navigation.navigate('Forgot')}>Forgot Password</Button>
        <Button onPress={() => navigation.navigate('Verify')}>Verify</Button>
        <Button onPress={() => navigation.navigate('Register')}>Register</Button>
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
});