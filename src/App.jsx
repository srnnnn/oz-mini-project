import "./App.css";
import MovieCard from "./components/MovieCard";
import { Outlet, Route, Routes } from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import api from "./api/axios";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Search from "./components/pages/Search";
import Footer from "./components/Footer";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const resp = await api.get("/movie/popular");
        setMovies(resp.data.results);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchMovieData();
  }, []);

  function MovieList() {
    return (
      <div className="container">
        {movies.map((movie) => (
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
  }

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
          <Route path="/" element={<MovieList />} />
          <Route path="details/:id" element={<MovieDetail />} />
          <Route path="signup" element={<Signup />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="search" element={<Search />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
