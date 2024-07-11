import css from './MovieInfo.module.css';

export default function MovieInfo({ movie }) {
  const { poster_path, title, vote_average, overview, genres } = movie;

  console.log('vote_average', vote_average);

  return (
    <div className={css.container}>
      {poster_path && title && (
        <img
          className={css.poster}
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
        />
      )}

      <div className={css.details}>
        {title && (
          <div className={css.detailsSection}>
            <h2 className={css.title}>{title}</h2>
          </div>
        )}

        {vote_average !== 0 && (
          <div className={css.detailsSection}>
            <div className={css.text}>
              User score: {`${Math.round(vote_average * 10)}%`}
            </div>
          </div>
        )}

        {overview && (
          <div className={css.detailsSection}>
            <h3>Overview</h3>
            <div>{overview}</div>
          </div>
        )}

        {genres && genres.length > 0 && (
          <div className={css.detailsSection}>
            <h3>Genres</h3>
            <ul className={css.genresList}>
              {genres.map((genre) => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
