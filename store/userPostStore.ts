import { create } from 'zustand';

// Define the type for your store state
interface userPostListStore {
  userPostList: string[];
  setUserPostList: (newList: string[]) => void;
}

// Create the store
export const useUserPostListStore = create<userPostListStore>((set) => ({
  userPostList: [], // Initial empty array
  setUserPostList: (newList) => set({ userPostList: newList }),
}));
