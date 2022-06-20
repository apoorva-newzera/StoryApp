import React, {useState, useEffect} from 'react';
import {
  AppRegistry,
  Text,
  Image,
  View,
  StyleSheet,
  Button,
  TextInput,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/header';
import Footer from '../components/footer';
import Square from '../components/square';
import Dialog from 'react-native-dialog';
import navigationStrings from '../constants/navigationStrings';
import {useNavigation} from '@react-navigation/native';
import Svg, {Polygon} from 'react-native-svg';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCirclePlus, faEllipsis} from '@fortawesome/free-solid-svg-icons';
import {
  ApolloClient,
  useQuery,
  useMutation,
  InMemoryCache,
  ApolloProvider,
  gql,
} from '@apollo/client';
import {launchImageLibrary} from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import DialogInput from 'react-native-dialog-input';

const GET_USER = gql`
  query {
    User {
      name
      bio
      profilepic
    }
  }
`;
const UPDATE_USER = gql`
  mutation updateUser($name: String!, $bio: String!) {
    updateUser(name: $name, bio: $bio) {
      name
      bio
    }
  }
`;
const UPDATE_PROFILEPIC = gql`
  mutation ($profilepic: String!) {
    updateProfilePic(profilepic: $profilepic) {
      profilepic
    }
  }
`;
const UPDATE_STORY = gql`
  mutation ($picture: String!, $text: String!) {
    updateStory(picture: $picture, text: $text) {
      picture
      text
    }
  }
`;

const newName = 'newName';
const newBio = 'newBio';

const sampleImageUri =
  'https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg';

//console.log(UserQueryHandler());
export default Profile = () => {
  const navigation = useNavigation();
  const bio = 'Photographer \nwww.hoarts.com';
  const name = 'Byong hom';
  const [userName, setUserName] = useState(name);
  const [userBio, setUserBio] = useState(bio);
  const [profilepicBorderColor, setProfilepicBorderColor] = useState('white');
  const [showCirclePlus, setShowCirclePlus] = useState(true);
  const [showEllipsis, setShowEllipsis] = useState(false);
  //nostory notviewed viewed
  const [storyViewStatus, setStoryViewStatus] = useState('nostory');
  //const [photo, setPhoto] = useState({uri: sampleImageUri});
  const [base64Image, setBase64Image] = useState('');

  function UserQueryHandler() {
    //client.query({query: GET_USER}).then(res=>return (<Text>{res}</Text>))
    const {loading, error, data} = useQuery(GET_USER, {
      pollInterval: 500,
    });
    if (loading)
      return {
        err: 'loading',
        User: {
          name: 'loading name...',
          bio: 'loading bio...',
        },
      };
    if (error)
      return {
        err: error.message,
        User: {
          name: error.message,
          bio: error.message,
        },
      };
    // setUserName('set by hook');
    //name = data.User.name;
    //console.log('image data from server : ', data.User.profilepic);
    setBase64Image(data.User.profilepic);
    //console.log('image base64 local data : ', base64Image);
    return data;
  }
  const handleChoosePhoto = () => {
    launchImageLibrary({noData: true}, response => {
      // console.log(response);
      if (response) {
        let imageFound = '';
        console.log(response.assets[0].uri);
        ImgToBase64.getBase64String(response.assets[0].uri)
          .then(base64String => {
            //setBase64Image(base64String);
            //setPhoto({uri: `data:image/png;base64,${base64Image}`});
            //console.log(base64String);
            imageFound = base64String;
            console.log(imageFound);
            updateProfilepicMutation({
              variables: {
                profilepic: imageFound,
              },
            });
          })
          .catch(err => console.log(err));

        //setPhoto(response.assets[0]);
      }
    });
  };
  const handleChooseStory = () => {
    launchImageLibrary({noData: true}, response => {
      if (response) {
        let imageFound = '';
        console.log(response.assets[0].uri);
        ImgToBase64.getBase64String(response.assets[0].uri)
          .then(base64String => {
            imageFound = base64String;
            updateStoryMutation({
              variables: {
                picture: imageFound,
                text: 'context of the story here',
              },
            });
            setProfilepicBorderColor('#fdbb21');
            setShowCirclePlus(false);
            setShowEllipsis(true);
          })
          .catch(err => console.log(err));
      }
    });
  };
  const [
    updateUserMutation,
    {loadingUserMutation, errorUserMutation, dataUserMutation},
  ] = useMutation(UPDATE_USER);
  const [
    updateProfilepicMutation,
    {
      loadingProfilepicMutation,
      errorProfilepicMutation,
      dataProfilepicMutation,
    },
  ] = useMutation(UPDATE_PROFILEPIC, {
    onError: err => {
      console.log('profilepic mutation error : ', err);
    },
  });

  const [
    updateStoryMutation,
    {loadingStoryMutation, errorStoryMutation, dataStoryMutation},
  ] = useMutation(UPDATE_STORY, {
    onError: err => {
      console.log('story mutation error : ', err);
    },
  });

  //console.log(UserQueryHandler());
  function User() {
    //const data = UserQueryHandler();
    const data = UserQueryHandler();
    //console.log('data value : ', data);
    //console.log('photo data : ', photo);
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.profilepicContainer}>
          <TouchableOpacity
            onPress={goToStoryScreen}
            onLongPress={uploadProfilePicHandler}>
            <View
              style={{
                borderColor: profilepicBorderColor,
                height: profilepicSize,
                width: profilepicSize,
                borderRadius: profilepicSize / 2,
                borderWidth: 4,
              }}>
              <Image
                style={styles.profilepic}
                // source={require('../assets/profilepic.jpg')}
                source={{uri: `data:image/png;base64,${base64Image}`}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={uploadStoryHandler}
            onLongPress={goToEditingScreen}>
            {showCirclePlus ? (
              <FontAwesomeIcon
                icon={faCirclePlus}
                style={styles.circleplus}
                size={40}
              />
            ) : null}
          </TouchableOpacity>
          <View>
            {showEllipsis ? (
              <FontAwesomeIcon
                icon={faEllipsis}
                style={styles.ellipsis}
                size={80}
              />
            ) : null}
          </View>
        </View>
        {/* <Button title="hide" onPress={hideButton} /> */}
        {/* <Button
          title="mutation"
          onPress={() =>
            updateUserMutation({
              variables: {
                name: 'ARB',
                bio: 'Wodfrld',
              },
            })
          }
        /> */}
        <View>
          <Text style={styles.nameText}>Name : {data.User.name}</Text>
          <Text style={styles.bioText}>Bio : {data.User.bio}</Text>
        </View>
      </View>
    );
  }
  const goToStoryScreen = () => {
    if (profilepicBorderColor !== 'white') {
      setProfilepicBorderColor('grey');
      setShowEllipsis(false);
      navigation.navigate(navigationStrings.STORY, {
        msg: 'brought message from Profile Screen',
      });
    }
  };
  const goToEditingScreen = () => {
    navigation.navigate(navigationStrings.EDIT, {
      msg: 'brought message from Profile Screen',
    });
  };
  const uploadProfilePicHandler = () => {
    handleChoosePhoto();
  };
  const uploadStoryHandler = () => {
    handleChooseStory();
  };
  const hideButton = () => {
    setShowCirclePlus(!showCirclePlus);
    setShowEllipsis(!showEllipsis);
    // UserUpdateHandler();
    //console.log(UserQueryHandler());
    //console.log('current base64data', base64Image);
  };

  //console.log('query result : ', UserQueryHandler());
  //const [userName,setUserName] = useState("localDataName");
  //UserQueryHandler(setUserName);
  //console.log(UserQueryHandler());
  return (
    <View style={styles.container}>
      <Header />

      <User />
      <Footer style={styles.footer} />
    </View>
  );
};

AppRegistry.registerComponent('StoryApp', () => Profile);
const profilepicSize = 200;
const styles = StyleSheet.create({
  storyinputModal: {
    margin: 400,
    backgroundColor: 'red',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilepicContainer: {
    height: profilepicSize,
    width: profilepicSize,
    marginBottom: 80,
  },
  profilepicView: {
    height: profilepicSize,
    width: profilepicSize,
    borderRadius: profilepicSize / 2,
    borderWidth: 4,
  },
  profilepic: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: profilepicSize / 2,
  },
  circleplus: {
    color: '#fdbb21',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  ellipsis: {
    padding: 10,
    color: '#fdbb21',
    position: 'absolute',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  nameText: {
    fontSize: 36,
    color: '#898989',
    textAlign: 'center',
    marginBottom: 8,
  },
  bioText: {
    fontSize: 24,
    color: '#898989',
    textAlign: 'center',
  },
  footer: {},
});
