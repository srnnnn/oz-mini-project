import api from "../api/axios";

const fetchMovieById = async (movieId) => {
  try {
    const response = await api.get(`movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch movie data", error);
    return null;
  }
};

const fetchMoviesByIds = async (movieIds) => {
  const movies = [];
  for (let i = 0; i < movieIds.length; i++) {
    const movieId = movieIds[i];
    try {
      const movie = await fetchMovieById(movieId);
      if (movie) {
        movies.push(movie);
      }
    } catch (error) {
      console.error(`Failed to fetch movie with ID ${movieId}`, error);
    }
  }
  return movies;
};

export default fetchMoviesByIds;
