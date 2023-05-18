import { StatusBar } from 'expo-status-bar';
import { Keyboard, SafeAreaView, StyleSheet, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Layout, Text, Icon, IconElement, TopNavigation, TopNavigationAction, Input } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import React, { useEffect, useState } from 'react';







export default function Forgot({ navigation }: Props) {

    const [email, setEmail] = useState('');

/*const BackIcon = (props: any): IconElement => (
    <Icon
        {...props}
        name='arrow-back'
    />
);*/

    
    const BackAction = (): React.ReactElement => (
       // <TopNavigationAction icon={BackIcon } />
       <Button onPress={() => navigation.navigate('Login')} appearance='ghost'>Back</Button>
      );
      
    return (
        <Layout style={styles.container} >
            <TopNavigation accessoryLeft={BackAction} style={styles.barBg} />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.headerContainer} >
                    <Text category='h1'>Reset Password</Text>
                    <Text style={styles.signInLabel} category='s1'>
                        Please enter your email address
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
                </View>

                <Button style={styles.signInButton} size='giant'>
                    Reset Password
                </Button>
            </SafeAreaView>
        </Layout>
    );

}

const styles = StyleSheet.create({
    container:  {
        flex: 1,
        backgroundColor: "black",
      },
      
    barBg: {
        backgroundColor: "black"
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
});