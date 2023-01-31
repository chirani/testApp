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
  return await supabase.auth.signInWithPassword({
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

const getSession = async (setting: any) => {
  try {
    const value = (await AsyncStorage.getItem('session')) ?? '';
    const parsedValue = await JSON.parse(value);
    setting(parsedValue);
    if (value !== null) {
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};
const setSession = async (value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    console.log('setter value', value);
    await AsyncStorage.setItem('session', jsonValue);
  } catch (e) {
    // saving error
  }
};

export {
  signUpWithEmail,
  signOut,
  signIn,
  updateProfile,
  setSession,
  getSession,
};
