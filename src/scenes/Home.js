import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CookieConsent from "react-cookie-consent";

import Error from "../components/Error";

import Carousel from "../components/Carousel";
import "../css/home.css";
import LoaderCustom from "../components/Loader";
import "../css/loader.css";

const Home = () => {
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [topRated, setTopRated] = useState();
  const [upcoming, setUpcoming] = useState();
  const [popular, setPopular] = useState();

  const getMovies = useCallback(() => {
    setIsLoading(true);
    const one = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`;
    const two = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1&region=US`;
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
  }, [errors]);

  useEffect(() => {
    getMovies();
    // return () => {
    //   cleanup;
    // };
  }, [getMovies]);

  if (errors.length > 0) {
    return <Error />;
  }

  return (
    <div className='home'>
      {isLoading ? (
        <LoaderCustom />
      ) : (
        <div>
          <Link
            style={{ textDecoration: "none", color: "#26c485" }}
            to='/top-rated/?page=1'
          >
            <h1 className='homeTitle'>Top Rated</h1>{" "}
          </Link>
          <Carousel slides={topRated} play={true} />
          <Link
            style={{ textDecoration: "none", color: "#26c485" }}
            to='/upcoming/?page=1'
          >
            <h1 className='homeTitle'>Upcoming</h1>{" "}
          </Link>
          <Carousel slides={upcoming} play={false} />
          <Link
            style={{ textDecoration: "none", color: "#26c485" }}
            to='/popular/?page=1'
          >
            <h1 className='homeTitle'>Popular</h1>{" "}
          </Link>
          <Carousel slides={popular} play={false} />
        </div>
      )}
      <CookieConsent
        location='bottom'
        buttonText='ok'
        className="cookiesBanner"
        style={{ background: "rgba(38, 196, 133, 0.8)", color: "black" }}
        buttonStyle={{
          boxShadow: '0px 4px 8px 2px #000000',
          color: "black",
          border: '1px solid black',
          background: "#26c485",
          fontSize: "17px",
          borderRadius: 20,
          textAlign: 'center'
        }}
        expires={150}
      >
        <p>This website uses cookies to enhance the user experience.{" "}</p>
      </CookieConsent>
    </div>
  );
};

export default Home;
