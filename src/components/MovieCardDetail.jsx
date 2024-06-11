import React from "react";
import "./MovieCardDetail.css";
import { Link } from "react-router-dom";

const MovieCardDetail = ({ backdrop_path, id, title }) => {
  return (
    <div className="movieCardDetail">
      <div className="MovieCardDetailImgDiv">
        <Link
          to={`/details/${id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <img
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt={title}
            className="MovieCardDetailImg"
          />
        </Link>
      </div>
    </div>
  );
};

export default MovieCardDetail;
