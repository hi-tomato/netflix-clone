import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// 실제 데이터 주소 저장
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
      return fetch(`/data/${keyword ? 'search' : 'popular'}.json`)
        .then((res) => res.json())
        .then((items) => items.results);
    }
  });
  return { isError, isLoading, data };
}

// use를 바꾸자
export function isSearch(keyword: string) {
  return useQuery({
    queryKey: ['videos', keyword],
    queryFn: async () => {
      return keyword ? useSearchData(keyword) : usePopularData();
    },
    staleTime: 1000 * 60 * 5,
    retry: 1
  });

  async function useSearchData(keyword: string) {
    return apiClient
      .get('/search/movie', {
        params: {
          language: 'ko-KR',
          query: keyword
        }
      })
      .then((res) => res.data.results);
  }
  async function usePopularData() {
    return apiClient
      .get('/movie/popular', {
        params: {
          language: 'ko-KR',
          page: 1
        }
      })
      .then((res) => res.data.results);
  }
}

// export async function useSearchData(keyword: string) {
//   return apiClient
//     .get('/search/movie', {
//       params: {
//         language: 'ko-KR',
//         query: keyword
//       }
//     })
//     .then((res) => res.data.results);
// }

// export async function usePopularData() {
//   return apiClient
//     .get('/search/popular', {
//       params: {
//         language: 'ko-KR',
//         page: 1
//       }
//     })
//     .then((res) => res.data.results);
// }
