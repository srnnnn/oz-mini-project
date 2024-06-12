import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";
import api from "../../api/axios";
import "./MovieList.css";

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const resp = await api.get("/movie/popular");
        console.log(resp);
        setMovies(resp.data.results);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchMovieData();
  }, []);
  return (
    <div className="container">
      {movies
        .filter((movie) => movie.poster_path && movie.title)
        .map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            poster_path={movie.poster_path}
            title={movie.title}
            vote_avg={movie.vote_average}
          />
        ))}
    </div>
  );
};

export default MovieList;
