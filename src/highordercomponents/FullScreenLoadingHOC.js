import React, { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { CustomText, Loader } from '../templates';
import { useNetInfo } from "@react-native-community/netinfo"
import { sizeHeight, sizeWidth } from '../helper/Util';
import { Colors } from '../assets/Themes';


export default (Comp) => {
    return ({ spinner, children, ...props }) => {

        const netInfo = useNetInfo()

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Comp {...props}>
                    {children}
                </Comp>

                {netInfo.isConnected
                    ? spinner &&
                    <View
                        style={[
                            StyleSheet.absoluteFill,
                            { backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }
                        ]}
                    >
                        <Loader isLoading={true} />
                    </View>
                    :
                    <View style={styles.internetBg}>
                        <CustomText style={styles.internetText}>No Internet connection</CustomText>
                    </View>
                }

            </SafeAreaView>
        )
    }
};

const styles = StyleSheet.create({
    internetText: {
        margin: 10,
        color: Colors.white
    },

    internetBg: {
        width: sizeWidth(100),
        backgroundColor: Colors.red
    },
});