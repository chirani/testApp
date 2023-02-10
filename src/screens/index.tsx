import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SigninScreen';
import StartTestScreen from './StartTestScreen';
import useAuthStore from '../zustand/store';
import CreateTestScreen from './CreateTestScreen';
import TestScreen from './TestScreen';
import {logCurrentStorage} from '@query/storage';
import PickTestScreen from './PickTestScreen';
import {getSessionStorage} from '@spbase/auth';
import TestQuestions from './TestQuestions';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  const {session, setSession} = useAuthStore();
  React.useEffect(() => {
    if (!session) {
      getSessionStorage(setSession);
    }
  }, []);
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
        headerShown: true,
        headerTitle: '',
      }}>
      <Stack.Screen
        name="StartScreen"
        component={StartTestScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen name="CreateTestScreen" component={CreateTestScreen} />
      <Stack.Screen name="TestScreen" component={TestScreen} />
      <Stack.Screen name="PickTestScreen" component={PickTestScreen} />
      <Stack.Screen name="TestQuestions" component={TestQuestions} />
    </Stack.Navigator>
  );
};

export default StackNav;
