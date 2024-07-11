import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '@components/MovieList/MovieList.jsx';
import SearchForm from '@components/SearchForm/SearchForm.jsx';
import { fetchMovies } from '@root/movies-api.js';
import css from '@pages/HomePage/HomePage.module.css';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const [movieName, setMovieName] = useState('');

  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = async (newMovieName) => {
    if (newMovieName === '') {
      return;
    }

    setMovies([]);
    setPage(1);
    setMovieName(newMovieName);
    searchParams.set('query', newMovieName);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const queryFromParams = searchParams.get('query');
    if (queryFromParams) {
      setMovieName(queryFromParams);
    }

    if (movieName === '') {
      return;
    }

    async function getMovies() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchMovies(movieName, page);
        setTotalPages(data.total_pages);
        setMovies((prevMovies) => {
          return [...prevMovies, ...data.results];
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    getMovies();
  }, [page, movieName, searchParams]);

  return (
    <div className={css.container}>
      <SearchForm onSearch={handleSearch} />

      {movies.length > 0 && <MovieList movies={movies} />}
      {loading && <p>Loading movies, please wait...</p>}
      {error && <p>Oops! There was an error, please reload this page!</p>}
    </div>
  );
}
