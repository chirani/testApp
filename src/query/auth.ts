import {
  getSessionStorage,
  setSessionStorage,
  signOut,
  updateSession,
} from '@spbase/auth';
import {signIn} from '@spbase/auth';
import {signUpWithEmail} from '@spbase/auth';
import useAuthStore from '@zustand/store';
import {useMutation, useQuery} from 'react-query';

const useSignUpWithEmail = () =>
  useMutation(async (credentials: any) => {
    return signUpWithEmail(credentials.email, credentials.password);
  });

const useSignin = () => {
  const authStore = useAuthStore();
  return useMutation(
    async (credentials: any) => {
      return signIn(credentials.email, credentials.password);
    },
    {
      onSuccess: () => {
        getSessionStorage(authStore.setSession);
      },
    },
  );
};

const useSignOut = () => {
  const authStore = useAuthStore();
  return useMutation(async () => signOut(), {
    onSuccess: () => {
      setSessionStorage(null);
      getSessionStorage(authStore.setSession);
    },
  });
};
const useUpdateSession = ({refresh_token}: Record<string, string>) =>
  useQuery('session_refresh', () => updateSession(refresh_token));

export {useSignUpWithEmail, useSignin, useSignOut, useUpdateSession};
