import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import app from "../firebase";
import api from "../api/axios";
import "./NavBar.css";
import MovieCard from "./MovieCard";
import { PiSunDimBold } from "react-icons/pi";
import { PiMoon } from "react-icons/pi";

const NavBar = () => {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState("");
  const [showSearch, setShowSearch] = useState(false); // 검색 창 가시성 상태 변수
  const [searchMovie, setSearchMovie] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth(app);

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
    setShowSearch(false);
  }, [location.pathname, user]);

  //검색
  const handleSearchInput = (e) => {
    setSearch(e.target.value);
    navigate(`/search?q=${e.target.value}`); //search로 했을때는 마지막 자음/모음 안들어감-> 영어로 하면 가능
  };

  //모바일 검색
  const handleSearchMInput = (search) => {
    navigate(`/search?q=${search}`);
  };

  //검색어리셋
  useEffect(() => {
    if (location.pathname === "/") {
      setSearch("");
    }
  }, [location.pathname]);

  //모바일창에서 검색
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

  //검색창 토글
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setSearch("");
      setSearchMovie([]);
    }
  };

  //다크모드
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("darkmode");
      document.body.classList.remove("lightmode");
    } else {
      document.body.classList.add("lightmode");
      document.body.classList.remove("darkmode");
    }
  });

  return (
    <>
      <nav className="navContainer">
        <Link to={"/"}>
          <div className="logoDiv">
            <img src="/logo.png" alt="로고" className="logoImg"></img>
          </div>
        </Link>
        <div className="search">
          <div className="searchDiv">
            {!showSearch ? (
              <IoSearch className="searchIcon" onClick={toggleSearch} />
            ) : (
              <RxCross2 className="searchCrossIcon" onClick={toggleSearch} />
            )}
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
        </div>
        <div className="mode" onClick={toggleDarkMode}>
          {isDarkMode ? <PiSunDimBold /> : <PiMoon />}
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
      {showSearch && (
        <div className="showSearchDiv">
          <div className="showSearch">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="search"
                placeholder="검색"
                className="searchInput"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                autoComplete="off"
              />
            </form>
          </div>
          <div className="searchContainer">
            {searchMovie
              .filter((movie) => movie.poster_path && movie.title)
              .slice(0, 3) //api에서 몇개만 받아올 수 없는지..
              .map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  poster_path={movie.poster_path}
                  title={movie.title}
                  vote_avg={movie.vote_average}
                  movieText={false}
                />
              ))}
          </div>
          {searchMovie.length > 0 && (
            <p
              className="searchMore"
              onClick={() => handleSearchMInput(search)}
            >
              {search} 관련 결과 더보기
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default NavBar;
