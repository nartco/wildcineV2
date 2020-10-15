import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import noPoster from "../assets/noposter.jpg";
import "../css/displayMovies.css";

const DisplayMovie = props => {
  const { movies } = props;
  if (movies.length === 0) {
    return (
      <div className='movieContainers'>
        <h1 className='genderTitle'>No result</h1>
      </div>
    );
  }
  return movies.map((movie, i) => (
    <Grid item xs={12} sm={3} lg={3} key={i}>
      <div className='movieContainers'>
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
