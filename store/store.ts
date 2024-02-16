import { create } from 'zustand';


// Define the type for your store state
interface PostListStore {
  postList: string[];
  setPostList: (newList: string[]) => void;
}

// Create the store
export const usePostListStore = create<PostListStore>((set) => ({
  postList: [], // Initial empty array
  setPostList: (newList) => set({ postList: newList })
}));
