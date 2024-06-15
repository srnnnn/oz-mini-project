import React from "react";
import "./MovieCardDetail.css";
import { Link } from "react-router-dom";

const MovieCardDetail = ({ backdrop_path, id, title }) => {
  return (
    <div className="movieCardDetail">
      <Link
        to={`/details/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="MovieCardDetailImgDiv">
          <img
            src={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
            alt={title}
            className="MovieCardDetailImg"
          />

          <div className="movieTitleOverlay">{title}</div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCardDetail;
