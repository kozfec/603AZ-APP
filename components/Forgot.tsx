import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Layout, Text, Icon, IconElement, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import React from 'react';







export default function Forgot({ navigation }: Props) {

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
        <><TopNavigation accessoryLeft={BackAction} title='Forgot Page' style={styles.barBg} />
        <Layout style={styles.container}>
            <Text>Forgot Page</Text>
            <Button>IM a Button</Button>
        </Layout></>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
    },
    barBg: {
        backgroundColor: "black"
    }
});