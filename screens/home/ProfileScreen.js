import React from 'react';
import {View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const ProfileScreen = ({navigation}) => {
  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
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
