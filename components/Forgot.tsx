import { StatusBar } from 'expo-status-bar';
import { Keyboard, SafeAreaView, StyleSheet, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Layout, Text, Icon, IconElement, TopNavigation, TopNavigationAction, Input } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import React, { useEffect, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';






export default function Forgot({ navigation }: Props) { //not yet ready
 
    const [email, setEmail] = useState(''); //use state variable for the email when its set




    const BackAction = (): React.ReactElement => ( //back icon for navbar
    <Ionicons name="arrow-back-sharp" size={25} color="#83AF9F" onPress={() => navigation.navigate('Login')}  appearance='ghost'/>
    );

    return (
    
        <Layout style={styles.container} ><SafeAreaView style={{ flex: 1 }}>
            <TopNavigation accessoryLeft={BackAction} style={styles.barBg} />
            
                <KeyboardAwareScrollView
                    style={{ backgroundColor: '#12171C' }}
                    scrollEnabled={true}
                >
                    <View style={styles.headerContainer} >
                        <Text category='h1'>Reset Password</Text>
                        <Text style={styles.signInLabel} category='s1'>
                            Please enter your email address
                        </Text>
                    </View>

                    <View style={styles.formInput}>
                        <Input //Email Input
                            placeholder='Email'
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            autoCapitalize='none'
                            inputMode='email'
                        />
                    </View>
                </KeyboardAwareScrollView>

                <Button style={styles.signInButton} size='giant'>
                    Reset Password
                </Button>
            </SafeAreaView>
        </Layout>
        
    );

}

const styles = StyleSheet.create({
    formInput: {
        marginTop: 16,
        backgroundColor:'#181E28',
      },
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
        minHeight: 216,
        backgroundColor:'#12171C',
    },
    formContainer: {
        flex: 1,
        marignTop: 32,
        paddingHorizontal: 10,
        backgroundColor:'#12171C',
    },
    signInLabel: {
        marginTop: 16,
    },
    signInButton: {
        marginVertical: 12,
        marginHorizontal: 16,
        backgroundColor: '#7A823C'
    },
});