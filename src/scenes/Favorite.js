import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Error from "../components/Error";
import Grid from "@material-ui/core/Grid";

import DisplayMovies from "../components/DisplayMovies";
import LoaderCustom from "../components/Loader";

const Favorite = () => {
  const favorite = useSelector(state => state.favorite);

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    let moviesCopy = [];
    favorite.map((id, i) => {
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US`
        )
        .then(response => {
          moviesCopy.push(response.data);
          if (i + 1 === favorite.length) setIsLoading(false);
        })
        .catch(error => {
          setErrors(errors.concat(error.message));
          if (i + 1 === favorite.length) setIsLoading(false);
        });
      return setMovies(moviesCopy);
    });
  }, [favorite, errors]);

  if (errors.length > 0) {
    return <Error />;
  }

  if (!(favorite.length > 0) || !favorite)
    return (
      <div className='errorContainer'>
        <div>
          <h1 className='errorMessage'>no favorites yet</h1>
        </div>
      </div>
    );
  return (
    <React.Fragment>
      {isLoading ? (
        <LoaderCustom />
      ) : (
        <React.Fragment>
          <Grid container style={{ marginTop: "10vh" }} spacing={1}>
            <DisplayMovies movies={movies} />
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Favorite;
