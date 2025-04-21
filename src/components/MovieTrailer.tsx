import React from 'react';
import useMovieStore from '@/store/movieStore';

const MovieTrailer = () => {
  const movie = useMovieStore((state) => state.movie);

  if (!movie || !movie.videos) return null;

  const trailer = movie.videos.results.find(
    (video: { type: string; site: string }) =>
      video.type === 'Trailer' && video.site === 'YouTube'
  );

  if (!trailer) return null;

  const trailerUrl = `https://www.youtube.com/embed/${trailer.key}`;

  return (
    <section className="trailer-section">
      <h2>Trailer</h2>
      <div className="trailer-container">
        <iframe
          width="100%"
          height="500"
          src={trailerUrl}
          title="Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default MovieTrailer;
