import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import api from "../../api/axios";
import MovieCard from "../MovieCard";
import "./Search.css";

const Search = () => {
  const [searchMovie, setSearchMovie] = useState([]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search); //현재 url의 검색 문자열 가져옴 -> urlSearchParams객체로 변환해서 반환
  };

  let query = useQuery(); //반환받은 urlSearchParams객체
  //   console.log(query);
  const searchTerm = query.get("q"); //q?로 넘겼던 파라미터 받음
  //   console.log(searchTerm);
  const debounceSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debounceSearchTerm) {
      fetchSearchMovieData(searchTerm);
    }
  }, [debounceSearchTerm]);

  const fetchSearchMovieData = async (searchTerm) => {
    try {
      const resp = await api.get(
        `/search/multi?include_adult=false&query=${searchTerm}`
      );
      console.log(resp);
      setSearchMovie(resp.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  if (searchMovie.length > 0) {
    return (
      <div className="searchContainer">
        {searchMovie.map((movie) => (
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
