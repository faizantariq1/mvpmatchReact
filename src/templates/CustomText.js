import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Fonts } from '../assets/Themes';

export default class CustomText extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Text
        style={[styles.defaultStyle, this.props.style]}
        numberOfLines={this.props.numberOfLines}
        onPress={this.props.onPress}
        activeOpacity={1}
      >
        {this.props.children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  // ... add your default style here
  defaultStyle: {
    fontSize: Fonts.moderateScale(Fonts.size.regular),
  },
});
