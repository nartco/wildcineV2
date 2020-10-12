import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import "../css/home.css";

const axios = require("axios").default;

const Home = () => {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [topRated, setTopRated] = useState();
  const [upcoming, setUpcoming] = useState();
  const [popular, setPopular] = useState();

  const getMovies = useCallback(() => {
    setIsLoading(true);
    const one = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`;
    const two = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`;
    const three = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`;

    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
    const requestThree = axios.get(three);

    axios
      .all([requestOne, requestTwo, requestThree])
      .then(
        axios.spread((...responses) => {
          setTopRated(responses[0].data.results);
          setUpcoming(responses[1].data.results);
          setPopular(responses[2].data.results);
          setIsLoading(false);
        })
      )
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
        <img src='../../public/logo512.png' />
      ) : (
        <div>
          <Link style={{ textDecoration: "none", color: "#26c485" }} to='/'>
            <h1 className='homeTitle'>Top Rated</h1>{" "}
          </Link>
          <Carousel slides={topRated} />
          <Link
            style={{ textDecoration: "none", color: "#26c485" }}
            to='upcoming'
          >
            <h1 className='homeTitle'>Upcoming</h1>{" "}
          </Link>
          <Carousel slides={upcoming} />
          <Link style={{ textDecoration: "none", color: "#26c485" }} to='/'>
            <h1 className='homeTitle'>Popular</h1>{" "}
          </Link>
          <Carousel slides={popular} />
        </div>
      )}
    </div>
  );
};

export default Home;
