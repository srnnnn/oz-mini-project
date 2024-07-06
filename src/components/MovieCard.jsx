import { useState, useEffect } from "react";
import "./MovieCard.css";
import { Link } from "react-router-dom";
import { RxHeart, RxHeartFilled } from "react-icons/rx";
import useHeartStore from "../config/useHeartStore";

const MovieCard = ({ poster_path, title, id, vote_avg, movieText }) => {
  const { addHeartList, removeHeartList, heartList } = useHeartStore(
    (state) => ({
      addHeartList: state.addHeartList,
      removeHeartList: state.removeHeartList,
      heartList: state.heartList,
    })
  );
  console.log(title);

  const [clickHeart, setClickHeart] = useState(false);

  useEffect(() => {
    if (heartList.includes(id)) {
      setClickHeart(true);
    }
  }, [heartList, id]);

  const handleLikeList = () => {
    const newClickHeart = !clickHeart;
    setClickHeart(newClickHeart);

    if (newClickHeart) {
      addHeartList(id);
    } else {
      removeHeartList(id);
    }
  };

  return (
    <div className="movieCard" key={id}>
      <Link to={`/details/${id}`} className="noDeco">
        <div className="movieImgDiv">
          <img
            className="movieImg"
            src={`https://image.tmdb.org/t/p/w342/${poster_path}`}
            alt={`${title} 포스터 사진`}
          />
        </div>
        <div className="movieTitle">
          <strong>{title}</strong>
        </div>
      </Link>
      <div className={`movieInfo ${movieText ? "" : "movieHidden"}`}>
        <div className="movieInfoText">
          <div className="movieVote">
            평점 : {Math.floor(vote_avg * 10) / 10}
          </div>
          <div className="movieHeart" onClick={handleLikeList}>
            {clickHeart ? <RxHeartFilled /> : <RxHeart />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
