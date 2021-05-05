import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/home/HomeScreen';
import ProfileScreen from './screens/home/ProfileScreen';
import SignInScreen from './screens/auth/SignInScreen';
import SignUpScreen from './screens/auth/SignUpScreen';
import SigninPhoneNumber from './screens/auth/SigninPhoneNumber';
import {getUserData} from './screens/auth/Storage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Main = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);

  const CustomeTab = () => {
    // useFocusEffect(
    //   React.useCallback(() => {
    //     getUserData().then(data => {
    //       if (data) {
    //         setIsLoggedin(true);
    //       }
    //     });
    //   }, []),
    // );

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
        initialParams={{setIsLoggedin: setIsLoggedin}}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="PhoneNumber" component={SigninPhoneNumber} />
      </Stack.Navigator>
    );
  };
  return (
    <Stack.Navigator
      initialRouteName={isLoggedin ? 'HomeScreen' : 'Login'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={CustomeTab} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
};

export default App;
