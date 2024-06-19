import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "./Main.css";
import MovieCardDetail from "../components/MovieCardDetail";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";

import {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

const Main = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [bannerMovies, setBannerMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popularResp = await api.get("/movie/popular");
        setPopularMovies(popularResp.data.results);

        const topRatedResp = await api.get("/movie/top_rated");
        setTopRated(topRatedResp.data.results);

        const nowPlayingResp = await api.get("/movie/now_playing");
        setBannerMovies(nowPlayingResp.data.results);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      <div className="bannerContainer">
        <Swiper
          modules={[EffectCoverflow, Autoplay, Pagination, A11y]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={2}
          spaceBetween={0}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          className="mySwiper"
        >
          {bannerMovies.map((movie) => (
            <SwiperSlide key={movie.id} className="swiper-slide">
              <img
                src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
                alt={movie.title}
                className="swiper-content"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="movieCategory">
        <div className="categoryText">
          <h2>인기 영화</h2>
          <Link
            to="/popular-movies"
            style={{ textDecoration: "none", color: "black" }}
            className="more"
          >
            더보기 {">"}
          </Link>
        </div>
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={0}
          breakpoints={{
            0: {
              slidesPerView: 1,
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
          navigation
        >
          {popularMovies.map((movie) => (
            <SwiperSlide key={movie.id} className="swiper-slide-custom">
              <MovieCardDetail
                backdrop_path={movie.backdrop_path}
                title={movie.title}
                id={movie.id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <hr className="categoryHr" />
      <div className="movieCategory">
        <div className="categoryText">
          <h2>순위별 영화</h2>
          <Link
            to="/top-rated"
            style={{ textDecoration: "none", color: "black" }}
            className="more"
          >
            더보기 {">"}
          </Link>
        </div>
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={0}
          breakpoints={{
            0: {
              slidesPerView: 1,
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
          navigation
        >
          {topRated.map((movie) => (
            <SwiperSlide key={movie.id} className="swiper-slide-custom">
              <MovieCardDetail
                backdrop_path={movie.backdrop_path}
                title={movie.title}
                id={movie.id}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <hr className="categoryHr" />
    </>
  );
};

export default Main;
