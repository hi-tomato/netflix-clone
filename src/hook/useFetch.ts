import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}
interface ApiResponse {
  results: Movie[];
}

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_API_TMDB_MOVIES_KEY
  }
});

export function useGetMockData(keyword: string) {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['video', keyword],
    queryFn: async () => {
      return axios
        .get<ApiResponse>(`/data/${keyword ? 'search' : 'popular'}.json`)
        .then((res) => res.data.results);
    }
  });
  return { isError, isLoading, data };
}

export function useSearchOrPopularVideos(
  keyword: string
): UseQueryResult<Movie[], AxiosError> {
  return useQuery({
    queryKey: ['videos', keyword],
    queryFn: async () => {
      return keyword ? search(keyword) : popular();
    },
    staleTime: 1000 * 60 * 5,
    retry: 1
  });

  async function search(keyword: string): Promise<Movie[]> {
    return apiClient
      .get('/search/movie', {
        params: {
          language: 'ko-KR',
          query: keyword
        }
      })
      .then((res) => res.data.results)
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          throw new Error(`데이터 처리 실패: ${error.message}`);
        } else {
          throw new Error('알 수 없는 에러가 발생했습니다.');
        }
      });
  }

  async function popular(): Promise<Movie[]> {
    return apiClient
      .get<ApiResponse>('/movie/popular', {
        params: {
          language: 'ko-KR',
          page: 1
        }
      })
      .then((res) => res.data.results)
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          throw new Error(`데이터 처리 실패: ${error.message}`);
        } else {
          throw new Error('알 수 없는 에러가 발생했습니다.');
        }
      });
  }
}
