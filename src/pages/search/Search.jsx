import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDebounce } from "../../components/hooks/useDebounce";
import api from "../../api/axios";
import MovieCard from "../../components/MovieCard";
import "./Search.css";

const Search = () => {
  const [searchMovie, setSearchMovie] = useState([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
    //uselocation().search 현재 url의 쿼리 문자열 가져옴 -> urlSearchParams객체로 변환해서 반환
  };

  let query = useQuery(); //반환받은 urlSearchParams객체
  const searchTerm = query.get("q"); //넘겼던 파라미터 받음 key가 q인 value를 받음
  const debounceSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debounceSearchTerm) {
      fetchSearchMovieData(searchTerm);
    }
  }, [debounceSearchTerm]); //한글자라도 들어오면 실행할 거 같은데 안됨

  const fetchSearchMovieData = async (searchTerm) => {
    try {
      const resp = await api.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      setSearchMovie(resp.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  if (searchMovie.length > 0) {
    return (
      <div className="searchContainer">
        {searchMovie
          .filter((movie) => movie.poster_path && movie.title)
          .map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              poster_path={movie.poster_path}
              title={movie.title}
              vote_avg={movie.vote_average}
            />
          ))}
      </div>
    );
  } else {
    return (
      <section className="noSearch">
        <div className="noSearchText">
          <p>
            wavve에 <strong>'{searchTerm}'</strong> 에 대한 검색 결과가
            없습니다.
            <br />
            다른 검색어로 검색해주세요.
          </p>
        </div>
      </section>
    );
  }
};

export default Search;
