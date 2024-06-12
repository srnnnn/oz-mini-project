import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../firebase";
import "./NavBar.css";

const NavBar = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth(app); //여기app도..왜 들어갈까..

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      // console.log(user);
    });
  }, [auth]);

  useEffect(() => {
    if (
      (location.pathname === "/login" || location.pathname === "/signup") &&
      user
    ) {
      navigate("/");
    }
  }, [location.pathname, user]);

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
    navigate(`/search?q=${e.target.value}`); //search로 했을때는 마지막 자음/모음 안들어감-> 영어로 하면 가능
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setSearch(""); //검색어리셋
    }
  }, [location.pathname]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        alert("로그아웃이 완료되지 않았습니다");
      });
  };

  return (
    <nav className="navContainer">
      <Link to={"/"}>
        <div className="logoDiv">
          <img src="/logo.png" alt="로고" className="logoImg"></img>
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
      {user ? (
        <div className="userImgDiv">
          <img
            src={user.photoURL || "/noimg_2.png"}
            alt={user.displayName}
            className="userImg"
          />
          <div className="dropdown">
            <Link
              to={"/mypage"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <p>마이페이지</p>
            </Link>
            <p onClick={handleLogout}>로그아웃</p>
          </div>
        </div>
      ) : (
        <div className="btnDiv">
          <Link to={"/login"}>
            <button className="loginBtn">로그인</button>
          </Link>
          <Link to={"/signup"}>
            <button className="signupBtn">회원가입</button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
