//import liraries
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  ApolloClient,
  useQuery,
  useMutation,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';
import USER_DETAIL from '../constants/user';

const UPDATE_STORY_TITLE = gql`
  mutation ($id: Int!, $text: String!) {
    updateStoryTitle(id: $id, text: $text) {
      picture
      text
    }
  }
`;

// create a component
const Edit = () => {
  const navigation = useNavigation();
  const [storyTitle, setStoryTitle] = useState('Story Title not set');
  const [
    updateStoryTitleMutation,
    {
      loadingStoryTitleMutation,
      errorStoryTitleMutation,
      dataStoryTitleMutation,
    },
  ] = useMutation(UPDATE_STORY_TITLE, {
    onError: err => {
      console.log('story title mutation error : ', err);
    },
  });
  const submitHandler = () => {
    console.log('started story title update');
    updateStoryTitleMutation({
      variables: {
        text: storyTitle,
        id: USER_DETAIL.ID,
      },
    });
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Set Story Title</Text>
      <TextInput
        placeholder="Enter Story title"
        style={styles.input}
        onChangeText={setStoryTitle}
      />
      <Button style={styles.button} title="Submit" onPress={submitHandler} />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  text: {
    margin: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  button: {},
  input: {
    marginBottom: 20,
    backgroundColor: 'grey',
  },
});

//make this component available to the app
export default Edit;
