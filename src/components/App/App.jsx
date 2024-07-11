import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import css from './App.module.css';

// Lazy pages
const HomePage = lazy(() => import('@pages/HomePage/HomePage.jsx'));
const MoviesPage = lazy(() => import('@pages/MoviesPage/MoviesPage.jsx'));
const MovieDetailsPage = lazy(
  () => import('@pages/MovieDetailsPage/MovieDetailsPage.jsx'),
);
const NotFoundPage = lazy(() => import('@pages/NotFoundPage/NotFoundPage.jsx'));

// Lazy components
const Navigation = lazy(() => import('@components/Navigation/Navigation.jsx'));
const MovieCast = lazy(() => import('@components/MovieCast/MovieCast.jsx'));
const MovieReviews = lazy(
  () => import('@components/MovieReviews/MovieReviews.jsx'),
);

export default function App() {
  return (
    <div className={css.container}>
      <Navigation />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
