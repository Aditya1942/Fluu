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
    </View>
  );
};
export default SignUpScreen;
