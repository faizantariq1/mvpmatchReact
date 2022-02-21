/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import ScreenNames from '../helper/ScreenNames';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavScreen from '../screens/FavScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SearchResultsScreen from '../screens/SearchResultsScreen';
const BaseTab = createNativeStackNavigator();





export default function BaseStack() {
  return (
    <NavigationContainer>
      <BaseTab.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <BaseTab.Screen name={ScreenNames.FavScreen} component={FavScreen} />
        <BaseTab.Screen name={ScreenNames.SearchResultsScreen} component={SearchResultsScreen} />
        <BaseTab.Screen name={ScreenNames.DetailsScreen} component={DetailsScreen} />


      </BaseTab.Navigator>
    </NavigationContainer>
  );
}
