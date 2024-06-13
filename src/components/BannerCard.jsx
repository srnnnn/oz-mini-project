import React from "react";
import { Link } from "react-router-dom";
import "./BannerCard.css";

const BannerCard = ({ backdrop_path, id, title }) => {
  return (
    <div className="bannerContainer">
      <div className="bannerImgDiv">
        <Link
          to={`/details/${id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w780/${backdrop_path}`}
            alt={title}
            className="bannerImg"
          />
        </Link>
      </div>
    </div>
  );
};

export default BannerCard;
