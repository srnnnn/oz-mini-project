import { useEffect, useState } from "react";
import "./MovieDetail.css";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import MovieCardDetail from "./MovieCardDetail";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);
  const [error, setError] = useState("");

  const [movieSimilar, setMovieSimilar] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const resp = await api.get(`/movie/${id}`);
        const resp2 = await api.get(`/movie/${id}/similar`);
        setMovieDetail(resp.data);
        setMovieSimilar(resp2.data.results);
      } catch (error) {
        console.error("Error: ", error);
        setError(error.code);
      }
    };
    fetchMovieData();
  }, [id]);

  if (error) {
    return <div>에러..</div>;
  }
  if (!movieDetail) {
    return <div className="">로딩중..</div>;
  }

  return (
    <>
      <div className="movieDetailContainer">
        <div className="imgContainer">
          <img
            src={`https://image.tmdb.org/t/p/original/${movieDetail.backdrop_path}`}
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
      <div className="movieSimilarContainer">
        <h2>비슷한 영화</h2>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={0}
          breakpoints={{
            0: {
              slidesPerView: 1, // 1개의 슬라이드를 보여줌
            },
            200: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          // navigation
        >
          {movieSimilar.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MovieCardDetail
                backdrop_path={movie.backdrop_path}
                title={movie.title}
                id={movie.id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default MovieDetail;
