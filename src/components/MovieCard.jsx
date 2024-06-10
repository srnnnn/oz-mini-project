import { useState } from "react";
import "./MovieCard.css";
import { Link } from "react-router-dom";

const MovieCard = ({ poster_path, title, id, vote_avg }) => {
  const [movieHeart, setMovieHeart] = useState("♡");
  const [clickHeart, setClickHeart] = useState(false);
  const handleInterestList = () => {
    setClickHeart(!clickHeart);
    clickHeart ? setMovieHeart("♡") : setMovieHeart("♥");
  };
  return (
    <div className="movieCard" key={id}>
      <Link
        to={`/details/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="movieImgDiv">
          <img
            className="movieImg"
            src={`https://image.tmdb.org/t/p/original/${poster_path}`}
            alt={`${title} 포스터 사진`}
          />
        </div>
        <div className="movieTitle">
          <strong>{title}</strong>
        </div>
      </Link>
      <div className="movieInfo">
        <div className="movieVote">평점 {Math.floor(vote_avg * 10) / 10}</div>
        <div className="movieHeart" onClick={handleInterestList}>
          {movieHeart}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
