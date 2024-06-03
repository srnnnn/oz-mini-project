import React from 'react'
import movieDetailData from '../../movieDetailData.json';
import './MovieDetail.css'

const MovieDetail = () => {
  return (
    <div className='movieDetail'>
        <div className='imgContainer'>
            <img 
                src={`https://image.tmdb.org/t/p/original${movieDetailData.backdrop_path}`}
                className='movieDetailImg'></img>
        </div>
        <div className='movieText'>
            <div className='movieDetailTitle'>{movieDetailData.title}</div>
            <span className='movieDetailVote'>평점 : {movieDetailData.vote_average.toFixed(1)}</span>
            <span className='movieDetailGenre'>
                장르 : {movieDetailData.genres.map((genre, i) => 
                    { return <span key={i}>{genre.name} {i !== movieDetailData.genres.length - 1? ',':null}</span>})}</span>
            <div className='movieDetailOverView'>{movieDetailData.overview}</div>
        </div>
    </div>
  )
}

export default MovieDetail