import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Layout, Text } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';

export default function Garage({ navigation }: Props){

    return(
        <Layout style={styles.container}>
        <Text>Welcome to my garage"</Text>
        <Button>Garage button</Button>
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