//import liraries
import React, {Component} from 'react';
import {View, StyleSheet, AppRegistry} from 'react-native';
import Routes from './navigation/routes';
import {
  ApolloClient,
  useQuery,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

import MainComponent from './maincomponent';

const client = new ApolloClient({
  uri: 'http://192.168.1.162:4000/graphql',
  cache: new InMemoryCache(),
});

// create a component
const App = () => {
  return (
    <ApolloProvider client={client}>
      {/* <MainComponent /> */}
      <View style={styles.container}>
        <Routes />
      </View>
    </ApolloProvider>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default App;