import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Square = props => {
  return (
    <View>
      <View style={[props.style, styles.squareShapeView]} />
    </View>
  );
};
const len = 35;
const styles = StyleSheet.create({
  squareShapeView: {
    width: len,
    height: len,
    backgroundColor: '#fdbb21',
  },
});
export default Square;
