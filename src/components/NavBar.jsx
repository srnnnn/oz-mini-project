import React, { useState } from "react";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

const NavBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
    navigate(`/search?q=${search}`);
  };

  return (
    <nav className="navContainer">
      <Link to={"/"}>
        <div className="logoDiv">
          <img src="src/images/logo.png" alt="로고" className="logoImg"></img>
        </div>
      </Link>
      <div className="searchDiv">
        <IoSearch className="searchIcon" />
        <input
          type="text"
          name="search"
          placeholder="검색"
          className="searchInput"
          onChange={handleSearchInput}
          value={search}
          autoComplete="off"
        />
      </div>
      <div className="btnDiv">
        <Link to={"/login"}>
          <button className="loginBtn">로그인</button>
        </Link>
        <Link to={"/signup"}>
          <button className="signupBtn">회원가입</button>
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
