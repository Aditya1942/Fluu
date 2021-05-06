import React from 'react';
import {View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
const ProfileScreen = ({navigation}) => {
  const signOut = async () => {
    var current_access_token = '';
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
    try {
      AccessToken.getCurrentAccessToken()
        .then(data => {
          current_access_token = data.accessToken.toString();
        })
        .then(() => {
          let logout = new GraphRequest(
            'me/permissions/',
            {
              accessToken: current_access_token,
              httpMethod: 'DELETE',
            },
            (error, result) => {
              if (error) {
                console.error('Error fetching data: ' + error.toString());
              } else {
                LoginManager.logOut();
              }
            },
          );
          new GraphRequestManager().addRequest(logout).start();
        })

        .catch(error => {
          console.error(error);
          navigation.navigate('Login');
        });
    } catch (error) {
      console.error(error);
    }
    AsyncStorage.removeItem('@userData');
    navigation.reset({
      routes: [{name: 'HomeScreen'}],
    });
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>I AM Profile Screen Page</Text>
      <Button title="sign out" onPress={signOut} />
    </View>
  );
};

export default ProfileScreen;
