import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { variables } from '../utils/constants'; 

const useMoviestore = create((set, get) => ({
  key: 'movie',
  isLoading: false,
  
  setKey: (data) => set({key:data}),
  
  getTrendingVideos: async () => {
    set({ isLoading: true });
    const key = get().key;
    try {
      const res = await axios.get(`${variables.BACKEND_URL}/videos/trending/${key}`);
      set({ isLoading: false });
      return { success: true, movie: res.data.data };
    } catch (error) {
      set({ isLoading: false });
      toast.error("Something went wrong");
      return { success: false };
    }
  }
}));

export default useMoviestore;
