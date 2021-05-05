import React from 'react';
import {View, Text, Button} from 'react-native';

const SignInScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>I AM SignIn Page</Text>
      <Button
        onPress={() => {
          navigation.navigate('SignUp');
        }}
        title="Go To Sign UP Page"
      />
    </View>
  );
};

export default SignInScreen;
