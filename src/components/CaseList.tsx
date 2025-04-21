import React from 'react';
import useMovieStore from '@/store/movieStore';

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

const CastList = () => {
  const movie = useMovieStore((state) => state.movie);

  if (!movie || !movie.credits || !movie.credits.cast) return null;

  return (
    <section className="cast-section">
      <h2>Cast</h2>
      <div className="cast-list">
        {movie.credits.cast.slice(0, 10).map((actor: CastMember) => (
          <div key={actor.id} className="cast-item">
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : '/placeholder-person.jpg'
              }
              alt={actor.name}
            />
            <p className="actor-name">{actor.name}</p>
            <p className="character">{actor.character}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CastList;
