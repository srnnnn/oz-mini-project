import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navContainer">
      <Link to={"/"}>
        <div className="logoDiv">
          <img src="src/images/logo.png" alt="로고" className="logoImg"></img>
        </div>
      </Link>
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
