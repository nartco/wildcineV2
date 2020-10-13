import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import noPoster from "../assets/noposter.jpg";
import "../css/displayMovies.css";

const DisplayMovie = props => {
  const { movies } = props;
  console.log(movies);
  return movies.map((movie, i) => (
    <Grid item xs={12} sm={6} lg={3} key={i} spacing={'30px'}>
      <div className='displayMoviesContainer'>
        <Link to='/movie' style={{ textDecoration: "none" }}>
          <div className='titleContainer'>
            <h1 className='displayTitle'>{movie.title} </h1>
          </div>
          <img
            src={
              movie.poster_path
                ? "https://image.tmdb.org/t/p/w400/" + movie.poster_path
                : noPoster
            }
            alt={movie.original_title}
            className='displayImage'
          />
          <div className='overlay'>
            <div className='text'>
              {movie.release_date.replaceAll("-", "/")}
            </div>
          </div>
        </Link>
      </div>
    </Grid>
  ));
};

export default DisplayMovie;
