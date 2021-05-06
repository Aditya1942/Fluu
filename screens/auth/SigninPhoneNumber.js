import React, {useState} from 'react';
import {Button, TextInput, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {setUserData} from './Storage';

const SigninPhoneNumber = ({navigation}) => {
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const SendOtp = async phoneNumber => {
    auth().signOut();
    try {
      console.log('PhoneNumber', PhoneNumber);
      const confirmation = await auth().signInWithPhoneNumber(
        `+91 ${phoneNumber}`,
      );
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
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {!confirm ? (
        <View>
          <TextInput
            style={{borderWidth: 1, width: 300, marginBottom: 20}}
            placeholder="Phone Number"
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
          <TextInput
            style={{borderWidth: 1, width: 300, marginBottom: 20}}
            placeholder="OTP"
            onChangeText={text => setCode(text)}
            value={code}
          />
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
