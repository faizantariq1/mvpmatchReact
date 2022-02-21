import React from 'react';
import { View, StyleSheet, } from 'react-native';
import { CustomText, CustomIconButton, CustomButton } from '.';
import { Icons, Colors } from '../assets/Themes';

import appTheme from "../assets/style/appTheme";
const Header = props => {
    let {
        title,
        navigation,
        back,
        style,
        onPressRight,
        rightText
    } = props;

    return (
        <View style={[styles.mainViewStyle, style]}>
            {back && (
                <View style={styles.leftContainStyle}>
                    <CustomIconButton
                        icon={<Icons.MaterialIcons name="arrow-back-ios" size={22} color={Colors.white} />}
                        onPress={() => { navigation && navigation.goBack() }}
                    />
                </View>
            )}
            <View style={styles.middleContainStyle}>
                <CustomText
                    style={styles.titleButtonStyle}
                >
                    {title}
                </CustomText>
                {rightText ?
                    <CustomButton
                        style={{ backgroundColor: 'transparent' }}
                        textStyle={{ color: Colors.blue }}
                        btnTitle={rightText}
                        onPress={onPressRight}
                    />
                    : null}
            </View>

        </View>
    )
}


const styles = StyleSheet.create({
    mainViewStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        height: 44,
        backgroundColor: Colors.appPrimaryColor
    },
    titleButtonStyle: {
        marginLeft: 20,
        color: Colors.white,
        ...appTheme.bold
    },

    middleContainStyle: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10,
    },
    leftContainStyle: {
        marginLeft: 20,
        alignItems: 'flex-start'
    }
});

export default Header;
