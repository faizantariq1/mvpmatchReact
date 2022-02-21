import React from 'react';
import {
    StyleSheet,
    View,
    ActivityIndicator,
} from 'react-native';
import { Colors } from '../../assets/Themes';
const BottomLoader = props => {
    let {
    } = props;

    return (
        <View
            style={styles.mainView}>
            <ActivityIndicator animating size="small" color={Colors.appPrimaryColor} />
        </View>
    )
}


const styles = StyleSheet.create({
    mainView: {
        paddingVertical: 20,
        borderColor: '#CED0CE',
        height: 20,
    },

});

export default BottomLoader;
