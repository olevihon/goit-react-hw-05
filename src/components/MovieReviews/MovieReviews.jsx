import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieReviewsById } from '@root/movies-api.js';

import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getReviews() {
      try {
        setLoading(true);
        const data = await fetchMovieReviewsById(movieId);
        setReviews(data.results);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getReviews();
  }, [movieId]);

  return (
    <div>
      {loading && <p>Loading movie reviews, please wait...</p>}
      {error && <p>Oops! There was an error, please reload this page!</p>}
      {!loading && reviews.length === 0 && (
        <p>We don&apos;t have any reviews for this movie</p>
      )}
      {!loading && reviews.length > 0 && (
        <ul className={css.list}>
          {reviews.map((item) => (
            <li key={item.id} className={css.listItem}>
              {item.author && (
                <div>
                  <b>Author: {item.author}</b>
                </div>
              )}
              {item.content && <div>{item.content}</div>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
