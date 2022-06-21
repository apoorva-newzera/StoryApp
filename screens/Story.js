//import liraries
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, SafeAreaView, Image} from 'react-native';
import ProgressBarExample from '../components/progressbar';
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

const GET_STORY = gql`
  query {
    Story(id: ${USER_DETAIL.ID}) {
      picture
      text
    }
  }
`;

// create a component
const Story = props => {
  const navigation = useNavigation();
  const readThisPromptText = 'SUCH AN AMAZING\n NEWS!  YOU  MUST';
  const [base64Image, setBase64Image] = useState('');

  function StoryQueryHandler() {
    //client.query({query: GET_USER}).then(res=>return (<Text>{res}</Text>))
    const {loading, error, data} = useQuery(GET_STORY, {
      pollInterval: 500,
    });
    if (loading)
      return {
        err: 'loading',
        Story: {
          picture: 'loading pic...',
          text: 'loading text...',
        },
      };
    if (error)
      return {
        err: error.message,
        Story: {
          picture: 'loading pic...',
          text: 'loading text...',
        },
      };
    // setUserName('set by hook');
    //name = data.User.name;
    //console.log('image data from server : ', data.User.profilepic);
    setBase64Image(data.Story.picture);
    //console.log('image base64 local data : ', base64Image);
    return data;
  }

  function StoryComponent() {
    const data = StoryQueryHandler();
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: `data:image/png;base64,${base64Image}`}}
        />
        <Text style={styles.text}>{data.Story.text}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <ProgressBarExample
          goBackProp={() => navigation.goBack()}
          style={styles.progressBar}
        />
        <StoryComponent />
      </View>
      <View style={{flex: 1, alignItems: 'center', marginTop: 200}}>
        <Text style={styles.readThisPromptText}>{readThisPromptText}</Text>
        <Text style={styles.readThisText}>READ THIS!</Text>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2b405b',
  },
  progressBar: {
    width: 360,
    marginBottom: 40,
    marginTop: 40,
  },
  text: {
    color: 'white',
    fontSize: 22,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  readThisPromptText: {
    color: 'white',
    fontSize: 27,
    marginTop: 16,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  readThisText: {
    color: 'white',
    fontSize: 45,
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  image: {
    marginTop: 30,
    height: 270,
    width: 360,
    borderRadius: 25,
  },
});

//make this component available to the app
export default Story;
