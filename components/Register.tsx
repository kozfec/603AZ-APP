import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Layout, Text } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';

export default function Register({ navigation }: Props){

    return(
        <Layout style={styles.container}>
        <Text>Register Page"</Text>
        <Button>IM a Button</Button>
      </Layout>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
})