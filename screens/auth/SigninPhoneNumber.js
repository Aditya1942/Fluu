import React, {useState} from 'react';
import {Button, TextInput, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {setUserData} from './Storage';

const SigninPhoneNumber = ({navigation}) => {
  console.log(navigation);
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  // If null, no SMS has been sent
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const SendOtp = async phoneNumber => {
    auth().signOut();
    try {
      console.log('PhoneNumber', PhoneNumber);
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      console.log('confirmation', confirmation);
      setConfirm(confirmation);
    } catch (error) {
      console.log('error', error);
    }
  };
  const VerifyOtp = async otp_code => {
    try {
      console.log('OTP CODE', otp_code);
      const Response = await confirm.confirm(code);
      if (Response) {
        console.log(Response);
        setUserData(Response);
        navigation.reset({
          routes: [{name: 'HomeScreen'}],
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  return (
    <View>
      {!confirm ? (
        <View>
          <TextInput
            onChangeText={text => setPhoneNumber(text)}
            value={PhoneNumber}
          />
          <Button
            title="Send Otp"
            onPress={() => {
              SendOtp(PhoneNumber);
            }}
          />
        </View>
      ) : (
        <View>
          <TextInput onChangeText={text => setCode(text)} value={code} />
          <Button
            title="Verify Otp"
            onPress={() => {
              VerifyOtp(PhoneNumber);
            }}
          />
        </View>
      )}
    </View>
  );
};

export default SigninPhoneNumber;
