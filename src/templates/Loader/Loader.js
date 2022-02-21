import React from 'react';
import {
    StyleSheet,
    View,
    Modal,
    ActivityIndicator,
} from 'react-native';
import { Colors } from '../../assets/Themes';
const Loader = props => {
    let {
        isLoading,
    } = props;

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={isLoading}
            onRequestClose={(isLoading) => { console.log('close modal') }}
        >
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>

                    <ActivityIndicator animating={isLoading} size="large" color={Colors.appPrimaryColor} />
                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#f7f7f7',
        height: 80,
        width: 80,

        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Loader;
