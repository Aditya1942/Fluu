import React from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {setUserData} from './Storage';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk';

import Icon from 'react-native-vector-icons/FontAwesome';

const SignInScreen = ({navigation}) => {
  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{marginBottom: 10}}>SignIn using Mobile number</Text>
      <Button
        onPress={() => {
          navigation.navigate('PhoneNumber');
        }}
        title="Sen dOtp"
      />
      <Text style={{marginVertical: 30}}>Or Continue with </Text>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={() =>
            onGoogleButtonPress().then(data => {
              console.log('Signed in with Google!', data);
              setUserData(data);
              navigation.reset({
                routes: [{name: 'HomeScreen'}],
              });
            })
          }>
          <Icon
            name="google"
            style={{paddingHorizontal: 10}}
            size={50}
            color={'#ea4335'}
          />
          <Text>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={() =>
            onFacebookButtonPress().then(data => {
              console.log('Signed in with Facebook!', data);
              setUserData(data);
              navigation.reset({
                routes: [{name: 'HomeScreen'}],
              });
            })
          }>
          <Icon
            name="facebook-square"
            style={{paddingHorizontal: 10}}
            size={50}
            color={'#09386E'}
          />
          <Text>FaceBook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;
