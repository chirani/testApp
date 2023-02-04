import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from './index';

const signUpWithEmail = async (email: string, password: string) =>
  supabase.auth
    .signUp({
      email,
      password,
    })
    .then(res => res)
    .catch(err => err);

const signOut = async () =>
  supabase.auth
    .signOut()
    .then(res => res)
    .catch(err => err);

const signIn = async (email: string, password: string) => {
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
};

const updateProfile = async (
  username: string,
  full_name: string,
  userId: string,
) =>
  await supabase
    .from('profiles')
    .update({username, full_name})
    .eq('id', userId);

const updateSession = async (refresh_token: string) =>
  supabase.auth.refreshSession({refresh_token});

const getSessionStorage = async (setting: any) => {
  try {
    const value = (await AsyncStorage.getItem('Session')) ?? '';
    const parsedValue = await JSON.parse(value);
    setting(parsedValue);
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};

const setSessionStorage = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);

    await AsyncStorage.setItem('Session', jsonValue);
  } catch (e) {
    // saving error
  }
};

export {
  signUpWithEmail,
  signOut,
  signIn,
  setSessionStorage,
  updateProfile,
  getSessionStorage,
  updateSession,
};
