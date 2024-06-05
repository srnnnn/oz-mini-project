import { useEffect, useState } from "react";
import "./MovieDetail.css";
import { useParams } from "react-router-dom";
import api from "../api/axios";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const resp = await api.get(`/movie/${id}`);
        setMovieDetail(resp.data);
      } catch (error) {
        console.error("Error: ", error);
        setError(error.code);
      }
    };
    fetchMovieData();
  }, [id]);

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }
  if (!movieDetail) {
    return <div>로딩중..</div>;
  }

  return (
    <div className="movieDetail">
      <div className="imgContainer">
        <img
          src={`https://image.tmdb.org/t/p/original${movieDetail.backdrop_path}`}
          className="movieDetailImg"
        ></img>
      </div>
      <div className="movieTextDiv">
        <div className="movieText">
          <div className="movieDetailTitle">{movieDetail.title}</div>
          <span className="movieDetailVote">
            평점 : {movieDetail.vote_average.toFixed(1)}
          </span>
          <span className="movieDetailGenre">
            장르 :{" "}
            {movieDetail.genres.map((genre, i) => {
              return (
                <span key={i}>
                  {genre.name}
                  {i !== movieDetail.genres.length - 1 ? ", " : null}
                </span>
              );
            })}
          </span>
          <div className="movieDetailOverView">{movieDetail.overview}</div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
