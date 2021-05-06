import React from 'react';
import {View, Text, Button} from 'react-native';
import {setUserData} from './Storage';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const SignInScreen = ({navigation}) => {
  async function onGoogleButtonPress() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>I AM SignIn Page</Text>
      <Button
        onPress={() => {
          navigation.navigate('SignUp');
        }}
        title="Go To Sign UP Page"
      />
      <View
        style={{
          marginTop: 10,
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          height: 200,
        }}>
        <Button
          onPress={() => {
            navigation.navigate('PhoneNumber');
          }}
          title="SignIn Using Phonenumber"
        />
        <Button
          onPress={() =>
            onGoogleButtonPress().then(data => {
              console.log('Signed in with Google!', data);
              setUserData(data);
              navigation.reset({
                routes: [{name: 'HomeScreen'}],
              });
            })
          }
          title="SignIn Using Google"
        />
        <Button onPress={() => {}} title="SignIn Using Facebook" />
      </View>
    </View>
  );
};

export default SignInScreen;
