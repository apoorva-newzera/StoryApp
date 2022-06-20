import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default Circle = props => {
  return (
    <View>
      <View style={[props.style, styles.circleShapeView]} />
    </View>
  );
};

const styles = StyleSheet.create({
  circleShapeView: {
    width: 39,
    height: 39,
    borderRadius: 39 / 2,
    borderWidth: 8,
    borderColor: 'white',
    backgroundColor: '#fdbb21',
  },
});
