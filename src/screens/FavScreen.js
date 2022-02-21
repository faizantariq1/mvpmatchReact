import React, { useEffect, useState } from 'react';
import { View, FlatList, Platform, KeyboardAvoidingView } from 'react-native';
import { CustomSearchBar, Header } from '../templates';
import appTheme from "../assets/style/appTheme"
import { FullScreenLoadingHOC } from '../highordercomponents';
import MovieShowGrid from '../components/Movie/MovieShowGrid';
import ScreenNames from '../helper/ScreenNames';
import PreferencesKeys from '../asyncstorage/PreferencesKeys';
import { Preferences } from '../asyncstorage/AppLocalStorage';
import { customAlert, filterArrayFromArray, filterByValue, findById } from '../helper/Util';
import UserContext from '../authcontaxt';
const FullScreenSpinnerView = FullScreenLoadingHOC(View);


const FavScreen = ({ navigation, route }) => {
    const value = React.useContext(UserContext);
    const movieShowFavList = value.movieShowFavList;
    const movieShowHideList = value.movieShowHideList;

    const [movieShowData, setMovieShowData] = useState([])
    const [filterMovieShowData, setFilterMovieShowData] = useState([])
    const [searchText, setSearchText] = useState('')

    useEffect(() => {

        let results = [...movieShowFavList];

        if (movieShowHideList && movieShowHideList.length > 0) {
            results = filterArrayFromArray(results, movieShowHideList)
        }
        setFilterMovieShowData(results)
        setMovieShowData(results)

    }, [movieShowFavList, movieShowHideList]);



    const onPressFav = (item, index) => {
        let newMovieShowData = [...filterMovieShowData];
        if (!item.fav) {
            newMovieShowData[index].fav = true
            setStorageFav(true, item)
        } else {
            newMovieShowData[index].fav = false
            setStorageFav(false, item)
        }

        setFilterMovieShowData(newMovieShowData)
    }
    function setStorageFav(fav, item) {
        let newData = [...movieShowFavList]
        if (fav) {
            newData.push(item)
            value.setMovieShowFavList(newData)
            Preferences._StoreData(PreferencesKeys.MOVIESHOW_FAV_LIST, newData).done();
        } else {
            var filterArray = filterByValue(newData, item.id)
            value.setMovieShowFavList(filterArray)
            Preferences._StoreData(PreferencesKeys.MOVIESHOW_FAV_LIST, filterArray).done();
        }
    }
    const onPressHide = (item, index) => {

        customAlert("", `Are you sure you want to hide? ${item.media_type === "movie" ? item.title : item.name}`, btnActionHide.bind(this, item, index))

    }
    function btnActionHide(item, index) {
        let newData = [...movieShowHideList]
        newData.push(item)
        value.setMovieShowHideList(newData)
        Preferences._StoreData(PreferencesKeys.MOVIESHOW_HIDE_LIST, newData).done();

        let newFiltersMovieShowData = [...filterMovieShowData];
        var filterArray = filterByValue(newFiltersMovieShowData, item.id)
        setFilterMovieShowData(filterArray)

        let newMovieShowData = [...movieShowData];
        var filterArray1 = filterByValue(newMovieShowData, item.id)
        setMovieShowData(filterArray1)
    }
    const onPressMovieShow = (item, index) => {
        navigation.navigate(ScreenNames.DetailsScreen, { item: item, index: index, btnActionHide: btnActionHide, onPressFav: onPressFav })
    }

    const findMovieShow = () => {
        navigation.navigate(ScreenNames.SearchResultsScreen)
    }

    const handleSearchBar = (text) => {
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = movieShowData.filter(function (item) {
                const name = item.media_type === "movie" ? item.title : item.name
                const itemData = name
                    ? name.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilterMovieShowData(newData);
            setSearchText(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilterMovieShowData(movieShowData);
            setSearchText(text);
        }

    }
    return (
        <FullScreenSpinnerView
            style={appTheme.containerStyle}
        >

            <Header
                title="Fav Movies/Shows"
                rightText="Find Movie/Show"
                onPressRight={() => { findMovieShow() }}
            />
            <CustomSearchBar
                onChangeText={handleSearchBar}
                value={searchText}
            />
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : ''} >
                <FlatList
                    data={filterMovieShowData}
                    numColumns={2}
                    // style={{ flex: 1 }}
                    renderItem={({ item, index }) => {
                        return (
                            <MovieShowGrid
                                item={item}
                                index={index}
                                onPressHide={() => onPressHide(item, index)}
                                onPressFav={() => onPressFav(item, index)}
                                onPress={() => onPressMovieShow(item, index)}
                            />
                        );
                    }}

                />
            </KeyboardAvoidingView>
        </FullScreenSpinnerView>
    );
};

export default FavScreen;
