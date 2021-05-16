import React from 'react';
import {View, Text, Button} from 'react-native';
const HomeScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>I AM Home Page</Text>
      <Button
        title="Voice"
        onPress={() => {
          navigation.navigate('Voice');
        }}
      />
    </View>
  );
};

export default HomeScreen;
