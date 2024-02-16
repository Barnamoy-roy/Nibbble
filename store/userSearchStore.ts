import {create} from 'zustand';

// define the type for your store state
interface userSearchStore {
    userSearch: string; 
    setUserSearch: (newSearch: string) => void;
}

// create store 
export const useUserSearchStore = create<userSearchStore>((set) => ({
    userSearch: '',
    setUserSearch: (newSearch) => set({userSearch: newSearch})
}))