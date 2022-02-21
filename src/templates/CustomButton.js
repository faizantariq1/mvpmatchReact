import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, } from 'react-native';
import { CustomText } from '.';
import appTheme from '../assets/style/appTheme';
import { Fonts, Colors } from '../assets/Themes';
const CustomButton = props => {
    let {
        onPress,
        style,
        btnTitle,
        textStyle
    } = props;

    return (
        <TouchableOpacity
            style={[
                styles.viewStyle,
                style,
            ]}
            onPress={onPress}>
            <View style={styles.textMainViewStyle}>
                <CustomText style={[styles.textStyle, textStyle]}>
                    {btnTitle}
                </CustomText>

            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: Colors.appPrimaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        borderRadius: 6,
        ...appTheme.cardStyle
    },

    textMainViewStyle: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: Fonts.size.regular,
        color: Colors.white,
        fontWeight: 'bold',
    },
});

export default CustomButton;
