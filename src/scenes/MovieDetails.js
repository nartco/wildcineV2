import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Line from "../components/Line";
import noPoster from "../assets/noposter.jpg";
import LoaderCustom from "../components/Loader";

import "../css/movieDetails.css";

const MovieDetails = () => {
  let { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [video, setVideo] = useState(null);
  const [credits, setCredits] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  const getMovies = useCallback(() => {
    setIsLoading(true);
    const one = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US`;
    const two = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=1`;
    const three = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US`;
    const four = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_MOVIE_KEY}`;

    const requestOne = axios.get(one);
    const requestTwo = axios.get(two);
    const requestThree = axios.get(three);
    const requestFour = axios.get(four);

    axios
      .all([requestOne, requestTwo, requestThree, requestFour])
      .then(
        axios.spread((...responses) => {
          setMovie(responses[0].data);
          setSimilar(responses[1].data.results);
          setVideo(responses[2].data.results);
          setCredits(responses[3].data);
          setIsLoading(false);
        })
      )
      .catch(error => {
        setErrors(errors.concat(error.message));
        setIsLoading(false);
      });
  }, [errors]);

  console.log({ movie }, { similar }, { video }, { credits });

  useEffect(() => {
    getMovies();
    // return () => {
    //   cleanup;
    // };
  }, [getMovies]);

  if (isLoading) return <LoaderCustom />;

  return (
    <div className='detailsContainer'>
      <img
        src={
          movie.poster_path
            ? "https://image.tmdb.org/t/p/w780/" + movie.poster_path
            : noPoster
        }
        alt={movie.original_title}
        className='detailsImage'
      />
      <div className='detailsInfos'>
        <h2 className='display'>{movie.original_title}</h2>
        <p className='detailsParagraph'>{movie.overview}</p>
        <h3 className='detailsParagraph'>
          {movie.release_date
            ? movie.release_date.replaceAll("-", " / ")
            : "no release date"}
        </h3>
        <p className='score'>User Score</p>
        <div className='circleBar'>
          <CircularProgressbar
            value={movie.vote_average * 10}
            text={`${movie.vote_average * 10}%`}
            strokeWidth={7}
            styles={buildStyles({
              textColor: "#26c485",
              trailColor: "rgba(38, 193, 129, 0.3)",
              pathColor: "#26c485"
            })}
          />
        </div>
       

        <Line color='#26C485' />
      </div>
    </div>
  );
};

export default MovieDetails;
