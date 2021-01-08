import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getUser() {
  try {
    return await AsyncStorage.getItem('@UsratiApp:user');
  } catch (e) {
    throw e;
  }
}

export const storeUser = async (user) => {
  return AsyncStorage.setItem('@UsratiApp:user', JSON.stringify(user));
};
