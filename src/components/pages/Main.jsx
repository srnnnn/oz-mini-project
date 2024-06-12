import "./Main.css";
import MovieList from "./MovieList";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import MovieCardDetail from "../MovieCardDetail";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Main = () => {
  const [bannerMovies, setBannerMovies] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // const resp = await api.get("/movie/popular");
        const resp = await api.get("/movie/now_playing");
        console.log(resp);
        setBannerMovies(resp.data.results);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchMovieData();
  }, []);
  return (
    <>
      <div className="bannerContainer">
        <div className="bannerMovies">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={false}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {bannerMovies.map((movie) => (
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
      </div>
      <MovieList />
    </>
  );
};

export default Main;
