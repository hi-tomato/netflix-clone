import React, { useEffect } from 'react';
import useMovieStore from '@/store/movieStore';
import { useLocation } from 'react-router-dom';
import MovieInfo from '@components/MovieInfo';
import MovieTrailer from '@components/MovieTrailer';
import CaseList from '@components/CaseList';
import SimilarMovies from '@components/SimilarMovies';

const VideoDetail = () => {
  const { state: video } = useLocation();
  const { movie, isLoading, isError, fetchMovieDetail, resetMovieState } =
    useMovieStore();

  console.log(movie);
  useEffect(() => {
    if (video && video.id) fetchMovieDetail(video.id);

    return () => resetMovieState();
  }, [video, fetchMovieDetail, resetMovieState]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;
  if (!movie) return <p>데이터를 받아오는 중 문제가 발생하였습니다.</p>;

  return (
    <div>
      <MovieInfo />
      <MovieTrailer />
      <CaseList />
      <SimilarMovies />
    </div>
  );
};

export default VideoDetail;
