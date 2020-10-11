import React, { useEffect, useState, useCallback } from "react";
import Carousel from "../components/Carousel";
const axios = require("axios").default;

const Home = () => {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState();

  const getMovies = useCallback(() => {
    setIsLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`
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
    getMovies();
    // return () => {
    //   cleanup;
    // };
  }, [getMovies]);

  return (
    <div>
      {isLoading ? (
        <img src={'../../public/logo512.png'} />
      ) : (
        <Carousel slides={movies} />
      )}
    </div>
  );
};

export default Home;
