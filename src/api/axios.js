import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API,
    language: "ko-KR",
    page: "1",
  },
});

export default instance;
