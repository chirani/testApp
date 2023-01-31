import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SigninScreen';
import StartTestScreen from './StartTestScreen';
import useAuthStore from '../zustand/store';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  const {session} = useAuthStore();

  console.log('My Session', session);
  return !session?.access_token ? (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
      </Stack.Navigator>
    </>
  ) : (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="StartScreen" component={StartTestScreen} />
    </Stack.Navigator>
  );
};

export default StackNav;
