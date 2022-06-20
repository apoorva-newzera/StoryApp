import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft, faEye, faBars} from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  const fontawesomeIconSize = 45;
  return (
    <View style={styles.header}>
      <FontAwesomeIcon
        icon={faChevronLeft}
        style={styles.leftarrow}
        size={fontawesomeIconSize}
      />

      <FontAwesomeIcon
        icon={faBars}
        size={fontawesomeIconSize}
        style={styles.hamburger}
      />
    </View>
  );
};
const gap = 140;
const styles = StyleSheet.create({
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 80,
    paddingTop: 32,
  },
  leftarrow: {
    marginRight: gap,
    color: '#fdbb21',
  },
  hamburger: {
    marginLeft: gap,
    color: '#fdbb21',
  },
});
export default Header;
