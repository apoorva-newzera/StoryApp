import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Minidecagon = props => {
  return (
    <View>
      <View style={[props.style, styles.circleShapeView]} />
    </View>
  );
};
const radius = 50;
const styles = StyleSheet.create({
  circleShapeView: {
    width: radius,
    height: radius,
    borderRadius: radius / 2,
    borderWidth: 4,
    borderColor: '#fdbb21',
    backgroundColor: 'transparent',
  },
});
export default Minidecagon;
