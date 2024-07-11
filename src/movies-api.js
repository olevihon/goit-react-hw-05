import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export const getMovies = async () => {
  const response = await axios.get('/trending/movie/day?language=en-US', {
    headers: { accept: 'application/json' },
  });
  return response.data;
};
