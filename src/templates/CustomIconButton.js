import React from 'react';
import { StyleSheet, TouchableOpacity, } from 'react-native';
const CustomIconButton = props => {
    let {
        onPress,
        style,
        icon,
    } = props;

    return (
        <TouchableOpacity
            style={[
                styles.viewStyle,
                style,
            ]}
            onPress={onPress}>
            {icon}
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    viewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
    },

});

export default CustomIconButton;
