import React, {Platform, useState, useEffect, PermissionsAndroid} from 'react';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/home/HomeScreen';
import ProfileScreen from './screens/home/ProfileScreen';
import SignInScreen from './screens/auth/SignInScreen';
import SignUpScreen from './screens/auth/SignUpScreen';
import SigninPhoneNumber from './screens/auth/SigninPhoneNumber';
import {getUserData} from './screens/auth/Storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Voice from './screens/Voice';
import SetupProfile from './screens/SetupProfile/SetupProfile';
import VoiceBkup from './screens/VoiceBackup';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const CustomeTab = () => {
  return (
    <Tab.Navigator initialRouteName={'Home'}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
const LoginScreen = () => {
  return (
    <Stack.Navigator
      initialRouteName={'SignIn'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="PhoneNumber" component={SigninPhoneNumber} />
    </Stack.Navigator>
  );
};
const MainStack = () => {
  const [isLoggedin, setIsLoggedin] = useState(true);
  const [profileSetedUp, setProfileSetedUp] = useState(false);
  useEffect(() => {
    getUserData().then(data => {
      console.log(data);
      if (!data) {
        setIsLoggedin(false); //
      } else {
        setIsLoggedin(true); //
      }
    });
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isLoggedin ? (
        profileSetedUp ? (
          <Stack.Screen name="Home" component={CustomeTab} />
        ) : (
          <>
            <Stack.Screen name="SetupProfile" component={SetupProfile} />
            <Stack.Screen name="Voice" component={Voice} />
            <Stack.Screen name="Voice2" component={VoiceBkup} />
          </>
        )
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};
const Main = () => {
  return (
    <Stack.Navigator
      initialRouteName={'HomeScreen'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={MainStack} />
    </Stack.Navigator>
  );
};

const App = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '654071625801-9b1od0nghc2sebl1ujjkac105eqog10m.apps.googleusercontent.com',
    });
  }, []);
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
};

export default App;
