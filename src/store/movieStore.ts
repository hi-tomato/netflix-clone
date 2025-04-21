import { MovieDetail, MovieState } from 'types/detailType';

import axios from 'axios';
import { create } from 'zustand';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_API_TMDB_MOVIES_KEY
  }
});

const useMovieStore = create<MovieState>((set, get) => ({
  movie: null,
  isLoading: false,
  isError: false,

  fetchMovieDetail: async (movieId: string) => {
    if (!movieId) throw Error('movieID 값을 전달받지 못하였습니다.');
    set({ isLoading: true, isError: false });

    try {
      const response = await apiClient.get<MovieDetail>(
        `/movie/${movieId}?append_to_response=credits,videos,similar`
      );
      set({ movie: response.data, isLoading: false });
    } catch (error) {
      console.error('Error fetching movie details:', error);
      set({ isError: true, isLoading: false });
    }
  },

  resetMovieState: () => set({ movie: null, isLoading: false, isError: false })
}));

export default useMovieStore;
