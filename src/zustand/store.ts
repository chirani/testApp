import {create} from 'zustand';

const useAuthStore = create((set: any): any => ({
  session: null,
  setSession: session => set(state => ({...state, session})),
}));

export default useAuthStore;
