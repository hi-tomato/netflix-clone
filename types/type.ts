export interface VideoData {
  adult: boolean;
  backdrop_path: string;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface MovieDetail {
  id: number;
  title: string;
  overview: string;
  tagline: string;
  backdrop_path: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  vote_count: number;

  genres: Array<{
    id: number;
    name: string;
  }>;
  // 기타 영화 관련 속성들
  credits: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
    }>;
  };
  videos: {
    results: Array<{
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
  similar: {
    results: Array<{
      id: number;
      title: string;
    }>;
  };
}

export interface MovieDetailResult {
  isLoading: boolean;
  isError: boolean;
  data: MovieDetail | undefined;
}
