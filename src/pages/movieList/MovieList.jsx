import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";
import api from "../../api/axios";
import "./MovieList.css";

const MovieList = ({ endpoint }) => {
  const [movies, setMovies] = useState([]);
  const [pageTitle, setPageTitle] = useState("");

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const resp = await api.get(endpoint);
        setMovies(resp.data.results);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    switch (endpoint) {
      case "/movie/popular":
        setPageTitle("인기 영화");
        break;
      case "/movie/top_rated":
        setPageTitle("순위 영화");
        break;
      default:
        setPageTitle("영화 목록");
        break;
    }
    fetchMovieData();
  }, [endpoint]);

  return (
    <>
      <h2 className="pageTitle">{pageTitle}</h2>
      <div className="movieListContainer">
        {movies
          .filter((movie) => movie.poster_path && movie.title)
          .map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              poster_path={movie.poster_path}
              title={movie.title}
              vote_avg={movie.vote_average}
              movieText={true}
            />
          ))}
      </div>
    </>
  );
};

export default MovieList;
