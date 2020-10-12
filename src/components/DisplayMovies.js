import React from "react";
import { Link } from "react-router-dom";
import "../css/displayMovies.css";

const DisplayMovie = props => {
  const { movies } = props;
  return movies.map(movie => (
    <div className='displayMoviesContainer'>
      <Link to='/movie'>
        <h1 className='displayTitle'>{movie.title} </h1>
        <img
          src={"https://image.tmdb.org/t/p/w400/" + movie.poster_path}
          alt={movie.original_title}
          className='displayImage'
        />
      </Link>
    </div>
  ));
};

export default DisplayMovie;
