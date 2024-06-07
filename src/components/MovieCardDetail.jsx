import React from "react";
import "./MovieCardDetail.css";

const MovieCardDetail = ({ backdrop_path, id, title }) => {
  return (
    <div className="movieCardDetail">
      {backdrop_path ? (
        <div className="MovieCardDetailImgDiv">
          <img
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt={title}
            className="MovieCardDetailImg"
          />
        </div>
      ) : (
        <div className="noImageDiv">
          {/* <div className="noImageTitle">{title}</div> */}
          <img src="../src/images/noimg.jpg" className="noImage" />
        </div>
      )}
    </div>
  );
};

export default MovieCardDetail;
