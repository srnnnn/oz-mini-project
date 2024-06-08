import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

const NavBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const location = useLocation();

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
    navigate(`/search?q=${e.target.value}`); //search로 했을때는 마지막 자음/모음 안들어감-> 영어로 하면 가능
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setSearch("");
    }
  }, [location]);

  return (
    <nav className="navContainer">
      <Link to={"/"}>
        <div className="logoDiv">
          <img src="src/images/logo.png" alt="로고" className="logoImg"></img>
        </div>
      </Link>
      {location.pathname === ""}
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
