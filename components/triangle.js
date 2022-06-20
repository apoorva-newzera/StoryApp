import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Triangle = props => {
  return (
    <View>
      <View style={[props.style, styles.triangleShapeView]} />
    </View>
  );
};

const styles = StyleSheet.create({
  triangleShapeView: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 36,
    borderColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#fdbb21',
  },
});
export default Triangle;
