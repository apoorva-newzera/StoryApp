import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Story from '../screens/Story';
import Profile from '../screens/Profile';
import Edit from '../screens/Edit';

import navigationStrings from '../constants/navigationStrings';
const Stack = createNativeStackNavigator();

// create a component
const MyComponent = () => {
  return (
    <View>
      <Text>MyCompoent</Text>
    </View>
  );
};

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={navigationStrings.PROFILE}>
        <Stack.Screen
          options={{title: 'My Profile'}}
          name={navigationStrings.PROFILE}
          component={Profile}
        />
        <Stack.Screen name={navigationStrings.STORY} component={Story} />
        <Stack.Screen name={navigationStrings.EDIT} component={Edit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
