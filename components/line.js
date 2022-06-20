import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Line = props => {
  return (
    <View>
      <View style={[props.style, styles.lineShapeView]} />
    </View>
  );
};

const styles = StyleSheet.create({
  lineShapeView: {
    width: 150,
    height: 1,
    backgroundColor: '#fdbb21',
  },
});
export default Line;
