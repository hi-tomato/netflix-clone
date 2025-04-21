import React from 'react';
import useMovieStore from '@/store/movieStore';
import { useNavigate } from 'react-router-dom';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

const SimilarMovies = () => {
  const movie = useMovieStore((state) => state.movie);
  const navigate = useNavigate();

  if (
    !movie ||
    !movie.similar ||
    !movie.similar.results ||
    movie.similar.results.length === 0
  )
    return null;

  const handleMovieClick = (similarMovie: Movie) => {
    navigate(`/video/watch/${similarMovie.id}`, { state: similarMovie });
  };

  return (
    <section className="similar-section">
      <h2>Similar Movies</h2>
      <div className="similar-list">
        {movie.similar.results.slice(0, 6).map((similarMovie: Movie) => (
          <div
            key={similarMovie.id}
            className="similar-item"
            onClick={() => handleMovieClick(similarMovie)}
          >
            <img
              src={
                similarMovie.poster_path
                  ? `https://image.tmdb.org/t/p/w200${similarMovie.poster_path}`
                  : '/placeholder-poster.jpg'
              }
              alt={similarMovie.title}
            />
            <p>{similarMovie.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarMovies;
