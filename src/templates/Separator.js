import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../assets/Themes/';

const Separator = props => {
  const { style } = props;
  return <View style={[styles.mainViewStyle, style,]} />
};

export default Separator;

const styles = StyleSheet.create({
  mainViewStyle: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.lightGray
  }
});

