import React from 'react';
import useMovieStore from '@/store/movieStore';

const MovieInfo = () => {
  const movie = useMovieStore((state) => state.movie);

  if (!movie) return null;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  };

  const formatRuntime = (minutes: number) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}h ${mins}m`;
  };

  return (
    <section className="movie-info-section">
      <div className="poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="info">
        <div className="movie-meta">
          <span>{formatDate(movie.release_date)}</span>
          <span>{movie.runtime ? formatRuntime(movie.runtime) : 'N/A'}</span>
          <span>
            {movie.genres
              .map((g: { id: number; name: string }) => g.name)
              .join(', ')}
          </span>
        </div>

        <div className="rating">
          <span>⭐ {movie.vote_average.toFixed(1)}/10</span>
          <span>({movie.vote_count} votes)</span>
        </div>

        <p className="overview">{movie.overview}</p>
      </div>
    </section>
  );
};

export default MovieInfo;
