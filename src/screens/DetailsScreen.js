import React, { useState } from 'react';
import { View, SafeAreaView, ImageBackground, ScrollView } from 'react-native';
import { CustomIconButton, CustomText, Header } from '../templates';
import appTheme from "../assets/style/appTheme"
import styles from "../assets/style/detailsStyle";
import { IMAGE_HOST } from '../lib/url';
import { FullScreenLoadingHOC } from '../highordercomponents';
import { Colors, Icons } from '../assets/Themes';
import { customAlert } from '../helper/Util';
import Constants from '../helper/Constants';

const FullScreenSpinnerView = FullScreenLoadingHOC(View);


const DetailsScreen = ({ navigation, route }) => {

    const item = route.params.item
    const name = item.media_type === "movie" ? item.title : item.name


    const [isFav, setIsFav] = useState(item && item.fav ? Constants.favIconName : Constants.unFavIconName)

    const onPressFav = () => {
        if (route.params.onPressFav) {
            route.params.onPressFav(item, route.params.index)
            if (isFav === Constants.favIconName) {
                setIsFav(Constants.unFavIconName)
            } else {
                setIsFav(Constants.favIconName)
            }
        }

    }
    const onPressHide = () => {
        customAlert("", `Are you sure you want to hide? ${name}`, btnActionHide.bind(this))
    }
    function btnActionHide() {

        if (route.params.btnActionHide) {
            route.params.btnActionHide(item, route.params.index)
        }
        navigation.goBack(null)
    }

    return (
        <FullScreenSpinnerView
            style={appTheme.containerStyle}
        >
            <Header
                title="Details"
                back
                navigation={navigation}
            />
            <ScrollView>
                <ImageBackground source={{ uri: IMAGE_HOST + item.backdrop_path }} style={styles.thumbnail} resizeMode="cover">
                    <View style={styles.mainViewText}>
                        <CustomText style={styles.text}>{name}</CustomText>
                    </View>
                    <View style={styles.footer}>
                        <CustomIconButton
                            onPress={onPressHide}
                            icon={<Icons.AntDesign name={"eye"} size={22} color={Colors.appPrimaryColor} />}
                        />
                        <CustomText style={styles.text}>{item.vote_average}</CustomText>
                        <CustomIconButton
                            onPress={onPressFav}
                            icon={<Icons.AntDesign name={isFav} size={22} color={Colors.appPrimaryColor} />}
                        />
                    </View>
                </ImageBackground>
                <CustomText style={styles.description}>
                    {item.overview}
                </CustomText>
            </ScrollView>
        </FullScreenSpinnerView>
    );
};

export default DetailsScreen;
