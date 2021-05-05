import React from 'react';
import {View, Text, Button} from 'react-native';

const SignUpScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>I AM SignUp Page</Text>
      <Button
        onPress={() => {
          navigation.navigate('SignIn');
        }}
        title="Go To Sign In Page"
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
        <Button onPress={() => {}} title="SignIn Using Google" />
        <Button onPress={() => {}} title="SignIn Using Facebook" />
      </View>
    </View>
  );
};
export default SignUpScreen;
