import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import DisplayMovies from "../components/DisplayMovies";

const Discover = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [movies, setMovies] = useState();
  const [index, setIndex] = useState(1);

  const getMovie = useCallback(index => {
    setIsLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=${index}`
      )
      .then(response => {
        setMovies(response.data.results);
        setIsLoading(false);
      })
      .catch(error => {
        setErrors(errors.concat(error.message));
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getMovie(index);
  }, [getMovie, index]);

  console.log(index);

  return (
    <div className='containerDisplay'>
      {isLoading ? null : <DisplayMovies movies={movies} />}
      <button onClick={() => setIndex(index + 1)}>+</button>
      <button onClick={() => setIndex(index - 1)}>-</button>
    </div>
  );
};

export default Discover;

// passer l'index dans les params de l'url 
