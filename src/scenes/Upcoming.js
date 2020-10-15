import React, { useState, useEffect, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import DisplayMovies from "../components/DisplayMovies";
import LoaderCustom from "../components/Loader";

const Upcoming = () => {
  let { page } = useParams();
  page = parseInt(page);
  if (page <= 0) page = 1;

  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [movies, setMovies] = useState();

  const getMovie = useCallback(() => {
    setIsLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=${page}`
      )
      .then(response => {
        setMovies(response.data.results);
        setIsLoading(false);
      })
      .catch(error => {
        setErrors(errors.concat(error.message));
        setIsLoading(false);
      });
  }, [page, errors]);

  useEffect(() => {
    getMovie(page);
  }, [getMovie, page]);

  return (
    <React.Fragment>
      {isLoading ? (
        <LoaderCustom />
      ) : (
        <React.Fragment>
          <Grid container style={{ marginTop: "10vh" }} spacing={1}>
            <DisplayMovies movies={movies} />
          </Grid>
          <div className='buttonContainer'>
            <Link
              style={{
                textDecoration: "none"
              }}
              to={`/upcoming/${page - 1}`}
            >
              <button className='pageButtons'>prev</button>
            </Link>
            <button disabled={true} className='pageButtons'>
              {page}
            </button>
            <Link
              style={{
                textDecoration: "none"
              }}
              to={`/upcoming/${page + 1}`}
            >
              <button className='pageButtons'>next</button>
            </Link>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Upcoming;

// passer l'index dans les params de l'url
