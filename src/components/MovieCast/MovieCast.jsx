import { useEffect, useState } from 'react';
import { fetchMovieCastsById } from '@root/movies-api.js';
import { useParams } from 'react-router-dom';

import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();

  const [casts, setCasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getCasts() {
      try {
        setLoading(true);
        const data = await fetchMovieCastsById(movieId);
        setCasts(data.cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getCasts();
  }, [movieId]);

  return (
    <>
      {loading && <p>Loading movie cast, please wait...</p>}
      {error && <p>Oops! There was an error, please reload this page!</p>}
      {!loading && casts.length === 0 && (
        <p>We don&apos;t have any casts for this movie</p>
      )}
      {!loading && casts.length > 0 && (
        <ul className={css.list}>
          {casts.map((actor) => (
            <li key={actor.id}>
              {actor.profile_path && actor.name && (
                <div>
                  <img
                    className={css.actorImg}
                    src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                    alt={actor.name}
                  />
                </div>
              )}
              {actor.name && (
                <div>
                  <b>Actor:</b> {actor.name}
                </div>
              )}
              {actor.character && (
                <div>
                  <b>Character:</b> {actor.character}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
