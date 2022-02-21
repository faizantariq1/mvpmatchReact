
import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { CustomText } from '.';
import { Colors, Fonts } from '../assets/Themes';
import { sizeWidth } from '../helper/Util';
const CustomSearchBar = props => {
    let {
        value,
        onChangeText,
        returnKeyType,
        onPressSearch,
        onSubmitEditing
    } = props;

    return (
        <View
            style={styles.mainView}>
            <TextInput
                autoCapitalize='none'
                autoCorrect={false}
                value={value}
                onChangeText={onChangeText}
                placeholder='Search'
                style={styles.input}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
            />
            {returnKeyType === 'search' && value && value.length > 0
                ? <CustomText style={styles.text}
                    onPress={onPressSearch}
                >
                    Search
                </CustomText>
                : null
            }
        </View>
    )
}




export default CustomSearchBar;
const styles = StyleSheet.create({
    input: {
        flex: 1,
        marginHorizontal: 10,
    },

    mainView: {
        backgroundColor: Colors.white,
        margin: 10,
        alignItems: 'center',
        borderColor: Colors.gray,
        borderWidth: 1,
        justifyContent: 'center',
        flex: 0.06,
        borderRadius: 25,
        flexDirection: 'row',
    },
    text: {
        marginRight: 10,
        color: Colors.blue,
        fontSize: Fonts.size.medium
    }
});