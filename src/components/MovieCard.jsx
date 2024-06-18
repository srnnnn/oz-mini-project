import { useState } from "react";
import "./MovieCard.css";
import { Link } from "react-router-dom";
import { RxHeart } from "react-icons/rx";
import { RxHeartFilled } from "react-icons/rx";

const MovieCard = ({ poster_path, title, id, vote_avg, movieText }) => {
  const [movieHeart, setMovieHeart] = useState(<RxHeart />);
  const [clickHeart, setClickHeart] = useState(false);
  const handleInterestList = () => {
    setClickHeart(!clickHeart);
    clickHeart ? setMovieHeart(<RxHeart />) : setMovieHeart(<RxHeartFilled />);
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
            src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
            alt={`${title} 포스터 사진`}
          />
        </div>
        <div
          className="movieTitle"
          style={{ color: movieText ? "initial" : "white" }}
        >
          <strong>{title}</strong>
        </div>
      </Link>
      <div className={`movieInfo ${movieText ? "" : "movieHidden"}`}>
        <div className="movieInfoText">
          <div className="movieVote">
            평점 : {Math.floor(vote_avg * 10) / 10}
          </div>
          <div className="movieHeart" onClick={handleInterestList}>
            {movieHeart}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
