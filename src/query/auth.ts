import {getSession, signOut} from '@spbase/auth';
import {setSession} from '@spbase/auth';
import {signIn} from '@spbase/auth';
import {signUpWithEmail} from '@spbase/auth';
import useAuthStore from '@zustand/store';
import {useMutation} from 'react-query';

const useSignUpWithEmail = () =>
  useMutation(
    async (credentials: any) => {
      return signUpWithEmail(credentials.email, credentials.password);
    },
    {
      onSuccess: () => {
        console.log('Signup Mutation Success');
      },
    },
  );

const useSignin = () => {
  const authStore = useAuthStore();
  return useMutation(
    async (credentials: any) => {
      return signIn(credentials.email, credentials.password);
    },
    {
      onSuccess: res => {
        console.log('Signin Mutation Success', res);
        setSession(res.data.session);
        getSession(authStore.setSession);
      },
    },
  );
};

const useSignOut = () => {
  const authStore = useAuthStore();
  return useMutation(async () => signOut(), {
    onSuccess: res => {
      console.log('SignOut Mutation Success', res);
      setSession(null);
      getSession(authStore.setSession);
    },
  });
};
export {useSignUpWithEmail, useSignin, useSignOut};
