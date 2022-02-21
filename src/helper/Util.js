import { Dimensions, Alert } from 'react-native';
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

const percentHeight = screenHeight / 100;
const percentWidth = screenWidth / 100;

export const sizeWidth = (percent) => {
    return percent * (percentWidth < percentHeight ? percentWidth : percentHeight);
};

export const sizeHeight = (percent) => {
    return percent * (percentWidth > percentHeight ? percentWidth : percentHeight);
};

export const filterArrayFromArray = (array1, array2) => {
    return array1.filter(f => !array2.some(item => item.id === f.id));
}
export const filterByValue = (array, value) => {
    return array.filter(item => item.id !== value);;
}
export const findById = (array, id) => {
    return array.findIndex(x => x.id == id);
}

export const customAlert = (title, description, onPressOk) => {
    Alert.alert(
        title,
        description,
        [
            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            { text: 'OK', onPress: onPressOk },
        ],
        { cancelable: false }
    )
}



