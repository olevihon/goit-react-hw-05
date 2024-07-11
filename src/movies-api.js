import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const API_READ_ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlNTg1OTIyNTJlMjAxYTA1M2U2YWM0OWI4MjEwOGYzOSIsIm5iZiI6MTcyMDY5MDAwMS42NTE0MjcsInN1YiI6IjY2OGY5ZGNlMGZiNmJlZGE5OTgxNjFmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MaJq3etHoFE9xxwlL2njk7_W_Tk473KqmWSHyFV_dfA';

export const fetchTrendingMovies = async () => {
  const response = await axios.get(`trending/movie/day?language=en-US`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
    },
  });
  return response.data;
};

export const fetchMovieById = async (movieId) => {
  const response = await axios.get(`movie/${movieId}`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
    },
  });
  return response.data;
};

export const fetchMovieCastsById = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/credits`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
    },
  });
  return response.data;
};

export const fetchMovieReviewsById = async (movieId) => {
  const response = await axios.get(`movie/${movieId}/reviews`, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
    },
  });
  return response.data;
};

export const fetchMovies = async (movieName, currentPage) => {
  const response = await axios.get(`search/movie`, {
    params: {
      query: movieName,
      page: currentPage,
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_READ_ACCESS_TOKEN}`,
    },
  });

  return response.data;
};
