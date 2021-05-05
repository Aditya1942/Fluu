import AsyncStorage from '@react-native-async-storage/async-storage';
export const setUserData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@userData', jsonValue);
  } catch (e) {
    // saving error
    throw e;
  }
};
export const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@userData');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    throw e;
  }
};
