import "./Mypage.css";
import { getAuth } from "firebase/auth";
import useHeartStore from "../../config/useHeartStore";
import { useEffect, useState } from "react";
import fetchMoviesByIds from "../../config/fetchMovieId";
import MovieCard from "../../components/MovieCard";

const Mypage = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [likeMovies, setlikeMovies] = useState([]);

  const { heartList } = useHeartStore((state) => ({
    heartList: state.heartList,
  }));

  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    // ...
    console.log(user);
    console.log(heartList);
  } else {
    // No user is signed in.
  }

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await fetchMoviesByIds(heartList);
      setlikeMovies(movies);
      console.log(movies);
    };

    fetchMovies();
  }, [heartList]);

  return (
    <div className="mypageContainer">
      <div className="userInfoDiv">
        <div className="userInfo">
          <img
            src={user.photoURL || "src/images/noimg_2.png"}
            className="mypage_userImg"
          />
          <p className="userText">{user.email}</p>
        </div>
      </div>
      <h2 className="h2">관심 목록</h2>
      <div className="interestListDiv">
        <div className="interestList">
          {likeMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              poster_path={movie.poster_path}
              title={movie.title}
              vote_avg={movie.vote_average}
              movieText={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
