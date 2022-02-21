import * as React from 'react';
import { TouchableOpacity, View, ImageBackground, StyleSheet } from 'react-native';
import { Icons, Colors, Fonts } from '../../assets/Themes';
import Constants from '../../helper/Constants';
import { sizeHeight } from '../../helper/Util';
import { IMAGE_HOST } from '../../lib/url';
import { CustomIconButton, CustomText } from '../../templates';

const MovieShowGrid = props => {
    const { item, index, onPress, onPressFav, onPressHide } = props;

    const isFav = item && item.fav ? Constants.favIconName : Constants.unFavIconName


    const name = item.media_type === "movie" ? item.title : item.name
    return (
        <TouchableOpacity style={styles.mainView} onPress={onPress} activeOpacity={1}>
            <ImageBackground style={styles.thumbnail} source={{ uri: IMAGE_HOST + item.poster_path }} >
                <View style={styles.header}>
                    <CustomText style={styles.text}>{name}:</CustomText>
                    <CustomText style={styles.text} numberOfLines={2}>{item.overview}</CustomText>
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
        </TouchableOpacity>
    );
};

export default MovieShowGrid;
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        margin: 1
    },
    text: {
        color: Colors.white,
        margin: 5,
        fontSize: Fonts.size.medium
    },
    header: {
        backgroundColor: Colors.transparentBg
    },
    footer: {
        backgroundColor: Colors.transparentBg,
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    thumbnail: {
        height: sizeHeight(20),
        justifyContent: 'flex-end',
    }
});