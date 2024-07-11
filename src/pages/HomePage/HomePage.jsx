import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '@root/movies-api.js';

import css from './HomePage.module.css';
import MovieList from '@components/MovieList/MovieList.jsx';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getTrendingMovies() {
      try {
        setLoading(true);
        const data = await fetchTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getTrendingMovies();
  }, []);

  return (
    <div className={css.container}>
      <h1>Trending today</h1>
      {loading && <p>Loading movies, please wait...</p>}
      {error && <p>Oops! There was an error, please reload this page!</p>}
      {!loading && movies.length === 0 && (
        <p>We don&apos;t have any movie to show</p>
      )}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
