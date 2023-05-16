import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Button, Layout, Text, Icon, IconElement, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';




export default function Forgot({ navigation }: Props) {

    const BackIcon = (props: any): IconElement => (
        <Icon
            {...props}
            name='arrow-back'
        />
    );
    
    const BackAction = (): React.ReactElement => (
        <TopNavigationAction icon={BackIcon } />
      );
      
    return (
        <Layout style={styles.container}>
            <TopNavigation accessoryLeft={BackAction} title='Eva Application'/>
            <Text>Forgot Page"</Text>
            <Button>IM a Button</Button>
        </Layout>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})