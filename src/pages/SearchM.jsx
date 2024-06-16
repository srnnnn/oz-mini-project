import React, { useState } from "react";
import "./SearchM.css";
import api from "../api/axios";
import MovieCard from "../components/MovieCard";

const SearchM = () => {
  const [search, setSearch] = useState("");
  const [searchMovie, setSearchMovie] = useState([]);

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await api.get(
        `/search/multi?include_adult=false&query=${search}`
      );
      setSearchMovie(resp.data.results);
    } catch (error) {
      console.error("Error searching:", error);
      setSearchMovie([]);
    }
  };

  return (
    <>
      <h2 className="searchH2">검색</h2>
      <div className="searchMcontainer">
        <form onSubmit={handleSubmit} className="searchMdiv">
          <input
            type="text"
            name="search"
            placeholder="검색"
            autoComplete="off"
            className="searchMinput"
            value={search}
            onChange={handleSearchInput}
          />
        </form>
        <div onClick={() => setSearch("")}>x</div>
      </div>
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
    </>
  );
};

export default SearchM;
