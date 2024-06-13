import "./App.css";

import { Outlet, Route, Routes } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import NavBar from "./components/NavBar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Search from "./pages/Search";
import Footer from "./components/Footer";
import Mypage from "./pages/Mypage";
import Main from "./pages/Main";
import SearchM from "./pages/SearchM";

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
