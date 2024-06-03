import './App.css'
import MovieCard from './pages/MovieCard'
import movieListData from '../movieListData.json';
import { Route, Routes } from 'react-router-dom';
import MovieDetail from './pages/MovieDetail';

function App() {

  console.log(movieListData.results)
  return (
    <>
      <Routes>
        <Route path='/' element={<MovieList/>}/>
        <Route path='/details' element={<MovieDetail/>}/>
      </Routes>
    </>
  )
}

function MovieList() {
  return(
    <div className='container'>
      {movieListData.results.map((movie) => (
        <MovieCard 
          key={movie.id} 
          poster_path={movie.poster_path} 
          title={movie.title} 
          vote_avg={movie.vote_average}/>
      )) }
    </div>
  )
}

export default App
