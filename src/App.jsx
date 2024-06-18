import "./App.css";

import { Outlet, Route, Routes } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import NavBar from "./components/NavBar";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Search from "./pages/search/Search";
import Footer from "./components/Footer";
import Mypage from "./pages/mypage/Mypage";
import Main from "./pages/Main";
import SearchM from "./pages/search/SearchM";
import MovieList from "./pages/movieList/MovieList";

function App() {
  const Layout = () => {
    return (
      <>
        <NavBar />
        <Outlet />
        <Footer />
      </>
    );
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route
            path="/popular-movies"
            element={<MovieList endpoint="/movie/popular" />}
          />
          <Route
            path="/now-playing"
            element={<MovieList endpoint="/movie/now_playing" />}
          />
          <Route
            path="/top-rated"
            element={<MovieList endpoint="/movie/top_rated" />}
          />
          <Route path="details/:id" element={<MovieDetail />} />
          <Route path="signup" element={<Signup />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="search" element={<Search />}></Route>
          <Route path="search-m" element={<SearchM />}></Route>
          <Route path="mypage" element={<Mypage />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
