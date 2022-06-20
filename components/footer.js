import React, {useState} from 'react';
import {Text, View, StyleSheet, Button, TextInput} from 'react-native';
import Header from './header';
import Square from './square';
import Minidecagon from './minidecagon';
import Triangle from './triangle';
import Line from './line';

export default App = props => {
  return (
    <View style={[props.style, styles.container]}>
      <View style={styles.upperContainer}>
        <Line style={styles.line} />
        <Minidecagon style={styles.miniDecagon} />
        <Line style={styles.line} />
      </View>
      <View style={styles.lowerContainer}>
        <Square style={styles.square} />
        <Triangle style={styles.triangle} />
      </View>
    </View>
  );
};

const lowerSeperationMargin = 100;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 36,
  },
  upperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lowerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {},
  miniDecagon: {},
  square: {
    flex: 1,
    marginRight: lowerSeperationMargin,
  },
  triangle: {
    flex: 1,
    marginLeft: lowerSeperationMargin,
  },
});
