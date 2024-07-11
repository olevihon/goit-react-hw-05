import { Suspense, useEffect, useRef, useState } from 'react';
import {
  NavLink,
  useParams,
  Outlet,
  useLocation,
  Link,
} from 'react-router-dom';

import MovieInfo from '@components/MovieInfo/MovieInfo.jsx';
import { fetchMovieById } from '@root/movies-api.js';

import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const location = useLocation();
  const backLinkRef = useRef(location.state ?? '/movies');
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMovie() {
      try {
        setLoading(true);
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getMovie();
  }, [movieId]);

  return (
    <div className={css.container}>
      <Link to={backLinkRef.current}>← Go back</Link>

      {loading && <p>Loading movie info, please wait...</p>}
      {error && <p>Oops! There was an error, please reload this page!</p>}
      {movie && <MovieInfo movie={movie} />}

      <div className={css.additionalInfo}>
        <div className={css.additionalInfoTitle}>Additional information</div>
        <ul className={css.additionalInfoList}>
          <li>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li>
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
      </div>

      <Suspense fallback={<div>Loading additional information...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
