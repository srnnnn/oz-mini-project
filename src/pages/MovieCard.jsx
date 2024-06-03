import "./MovieCard.css";
import { Link } from "react-router-dom";

const MovieCard = ({ poster_path, title, id, vote_avg }) => {
  return (
    <>
      <div className="movieCard" key={id}>
        <Link
          to={"/details"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <img
            className="movieImg"
            src={`https://image.tmdb.org/t/p/original/${poster_path}`}
            alt={`${title} 포스터 사진`}
          />
          <div className="movieTitle">
            <strong>{title}</strong>
          </div>
        </Link>
        <div className="movieVote">평점 {vote_avg.toFixed(1)}</div>
      </div>
    </>
  );
};

export default MovieCard;
