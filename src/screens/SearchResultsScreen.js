import React, { useEffect, useState, useRef } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { BottomLoader, CustomSearchBar, Header } from '../templates';
import appTheme from "../assets/style/appTheme"
import { useDispatch, useSelector } from 'react-redux';
import { listMovieShowIdle, listMovieShowRequest } from '../store/ducks/Movies/actions';
import { FullScreenLoadingHOC } from '../highordercomponents';
import MovieShowGrid from '../components/Movie/MovieShowGrid';
import ScreenNames from '../helper/ScreenNames';
import PreferencesKeys from '../asyncstorage/PreferencesKeys';
import { Preferences } from '../asyncstorage/AppLocalStorage';
import { customAlert, filterArrayFromArray, filterByValue, findById } from '../helper/Util';
import UserContext from '../authcontaxt';
import { Colors } from '../assets/Themes';
const FullScreenSpinnerView = FullScreenLoadingHOC(View);


const SearchResultsScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();


    const movieShowRequest = useSelector(state => state.movies.listMovieShow);
    const value = React.useContext(UserContext);
    const movieShowFavList = value.movieShowFavList;
    const movieShowHideList = value.movieShowHideList;

    const [searchResults, setSearchResults] = useState([])
    const [searchText, setSearchText] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const [isLoadingBottom, setIsLoadingBottom] = useState(false);

    var onEndReachedCalledDuringMomentum = useRef(false);

    const callApiSearch = (query, page) => {
        dispatch(listMovieShowRequest({ query: query, page: page }));
    }
    useEffect(() => {

        if (movieShowRequest.status == 'success') {
            setIsLoadingBottom(false)
            let results = [...(movieShowRequest.data && movieShowRequest.data.results)]

            for (let i = 0; i < movieShowFavList.length; i++) {
                var index = findById(results, movieShowFavList[i].id)
                if (index !== -1) {
                    results[index].fav = true
                }
            }
            if (movieShowHideList && movieShowHideList.length > 0) {
                results = filterArrayFromArray(results, movieShowHideList)
            }
            var filteredArray = results.filter(function (itm) {
                return itm.gender === null || itm.gender === undefined;
            });

            setSearchResults(searchResults.concat(filteredArray))
            // setSearchResults(searchResults.concat(results))
            dispatch(listMovieShowIdle())
        }

    }, [movieShowRequest.status]);



    const onPressFav = (item, index) => {
        let newMovieShowData = [...searchResults];
        if (!item.fav) {
            newMovieShowData[index].fav = true
            setStorageFav(true, item)
        } else {
            newMovieShowData[index].fav = false
            setStorageFav(false, item)
        }

        setSearchResults(newMovieShowData)
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

        customAlert("", `Are you sure you want to hide? ${item.name}`, btnActionHide.bind(this, item, index))

    }
    function btnActionHide(item, index) {
        let newData = [...movieShowHideList]
        newData.push(item)
        value.setMovieShowHideList(newData)
        Preferences._StoreData(PreferencesKeys.MOVIESHOW_HIDE_LIST, newData).done();

        let newMovieShowData = [...searchResults];
        var filterArray1 = filterByValue(newMovieShowData, item.id)
        setSearchResults(filterArray1)
    }
    const onPressMovieShow = (item, index) => {
        navigation.navigate(ScreenNames.DetailsScreen, { item: item, index: index, btnActionHide: btnActionHide, onPressFav: onPressFav })
    }

    const handleSearchBar = (text) => {
        setSearchText(text);
    }

    const onPressSearch = () => {
        setSearchResults([])
        setPageNumber(1)
        dispatch(listMovieShowRequest({ query: searchText, page: 1 }));
    }

    const loadMoreData = () => {
        setIsLoadingBottom(true)
        onEndReachedCalledDuringMomentum = true;
        setPageNumber(pageNumber + 1)
        callApiSearch(searchText, pageNumber + 1)

    }
    function renderFooter() {
        if (!isLoadingBottom) {
            return null;
        }

        return (
            <BottomLoader />
        );
    };
    return (
        <FullScreenSpinnerView
            style={appTheme.containerStyle}
            spinner={movieShowRequest.status == 'loading' && pageNumber === 1 ? true : false}
        >
            <Header
                title="Search"
                back
                navigation={navigation}
            />
            <CustomSearchBar
                onChangeText={handleSearchBar}
                value={searchText}
                returnKeyType='search'
                onPressSearch={onPressSearch}
                onSubmitEditing={onPressSearch}
            />
            <FlatList
                data={searchResults}
                numColumns={2}
                style={{ flex: 1 }}
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
                onEndReachedThreshold={0.01}
                onEndReached={({ distanceFromEnd }) => {
                    if (!onEndReachedCalledDuringMomentum) {
                        loadMoreData()
                    }
                }}
                onMomentumScrollBegin={() => {
                    onEndReachedCalledDuringMomentum = false;
                }}

                ListFooterComponent={renderFooter}

            />
        </FullScreenSpinnerView>
    );
};

export default SearchResultsScreen;
