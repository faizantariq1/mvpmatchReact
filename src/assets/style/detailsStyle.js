import { StyleSheet } from 'react-native';
import { sizeHeight, sizeWidth } from '../../helper/Util';
import { Colors, Fonts } from '../Themes';


module.exports = StyleSheet.create({
    thumbnail: {
        justifyContent: 'space-between',
        width: "100%",
        height: sizeHeight(30)
    },
    text: {
        color: Colors.white,
        margin: 5
    },
    mainViewText:
    {
        backgroundColor: Colors.transparentBg
    },
    description: {
        margin: 10
    },
    footer: {
        backgroundColor: Colors.transparentBg,
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
});
