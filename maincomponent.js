//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  ApolloClient,
  useQuery,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';

const GET_USER = gql`
  query {
    User {
      name
      bio
    }
  }
`;

function UserQueryHandler() {
  //client.query({query: GET_USER}).then(res=>return (<Text>{res}</Text>))
  const {loading, error, data} = useQuery(GET_USER);
  if (loading) return 'Loading...';
  if (error) return `Error : ${error.message}`;
  return data;
}

// create a component
const MainComponent = () => {
  //console.log('query result : ', UserQueryHandler().User.bio);
  return (
    <View style={styles.container}>
      <Text>Name : {UserQueryHandler().User.name}</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default MainComponent;
