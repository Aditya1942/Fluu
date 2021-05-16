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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const CustomeTab = () => {
  return (
    <Tab.Navigator initialRouteName={'Home'}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Voice" component={Voice} />
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
        <Stack.Screen name="Home" component={CustomeTab} />
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
    const AskPermissions = async () => {
      if (Platform.OS === 'android') {
        try {
          const grants = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          ]);

          console.log('write external stroage', grants);

          if (
            grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants['android.permission.READ_EXTERNAL_STORAGE'] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            grants['android.permission.RECORD_AUDIO'] ===
              PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.log('Permissions granted');
          } else {
            console.log('All required permissions not granted');
            return;
          }
        } catch (err) {
          console.warn(err);
          return;
        }
      }
    };
  }, []);
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
};

export default App;
