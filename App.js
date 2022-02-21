
import React, { useEffect, useState } from 'react';
import BaseStack from './src/stack/RootStack';
import { UserProvider } from './src/authcontaxt';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { Preferences } from './src/asyncstorage/AppLocalStorage';
import PreferencesKeys from './src/asyncstorage/PreferencesKeys';

const App = () => {
  const [movieShowFavList, setMovieShowFavList] = useState([]);
  const [movieShowHideList, setMovieShowHideList] = useState([]);

  useEffect(() => {
    getAyscStorageMovieShowFavList()
    getAyscStorageMovieShowHideList()
  }, [])

  const getAyscStorageMovieShowFavList = () => {
    Preferences._GetStoredData(PreferencesKeys.MOVIESHOW_FAV_LIST).then(data => {
      if (data) {
        setMovieShowFavList(data)
      }
    })
  }
  const getAyscStorageMovieShowHideList = () => {
    Preferences._GetStoredData(PreferencesKeys.MOVIESHOW_HIDE_LIST).then(data => {
      if (data) {
        setMovieShowHideList(data)
      }
    })
  }
  let state = {
    setMovieShowFavList: setMovieShowFavList,
    movieShowFavList: movieShowFavList,
    movieShowHideList: movieShowHideList,
    setMovieShowHideList: setMovieShowHideList,
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <UserProvider value={state}>
          <BaseStack />
        </UserProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
