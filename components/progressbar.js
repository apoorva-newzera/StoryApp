import React, {useState, useEffect, useRef} from 'react';
import {Text, View, StyleSheet, Animated} from 'react-native';
import {ProgressBar, Colors, TextInput} from 'react-native-paper';

const ProgressBarExample = props => {
  const counter = useRef(new Animated.Value(0)).current;
  const countInterval = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // load(count);
    if (count >= 115) {
      setCount(100);
      clearInterval(countInterval);
      props.goBackProp();
    }
  }, [count]);

  //   const load = count => {
  //     Animated.timing(counter, {
  //       toValue: count,
  //       duration: 500,
  //       useNativeDriver: true,
  //     }).start();
  //   };

  useEffect(() => {
    countInterval.current = setInterval(() => setCount(old => old + 1), 50);
    return () => {
      clearInterval(countInterval); //when user exits, clear this interval.
    };
  }, []);

  return (
    <View style={[props.style, styles.container]}>
      <ProgressBar progress={count / 100} color={'white'} />
      {/* <Text style={{color: 'white'}}>{count}</Text> */}
    </View>
  );
};

export default ProgressBarExample;

const styles = StyleSheet.create({
  container: {},
});
