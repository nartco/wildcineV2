import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";
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
          setSimilar(responses[1].data.results.splice(9, 10));
          setVideo(responses[2].data.results);
          setCredits(responses[3].data);
          setIsLoading(false);
        })
      )
      .catch(error => {
        setErrors(errors.concat(error.message));
        setIsLoading(false);
      });
  }, [errors, id]);

  console.log({ movie }, { similar }, { video }, { credits });

  useEffect(() => {
    getMovies();
    // return () => {
    //   cleanup;
    // };
  }, [getMovies]);

  const similarMovies = (path, name, id) => (
    <div className='similar' key={id}>
      <Link to={`/details/${id}`} style={{ textDecoration: "none" }}>
        <img
          src={!!path ? `https://image.tmdb.org/t/p/w500/${path}` : noPoster}
          alt={name}
        />
        <p>{name}</p>
      </Link>
    </div>
  );

  const castPresentation = (path, name, id, character = null) => (
    <div className='cast' key={id}>
      <img
        src={!!path ? `https://image.tmdb.org/t/p/w500/${path}` : noPoster}
        alt={name}
      />
      <p>{name}</p>
      {character ? <p>{character}</p> : null}
    </div>
  );

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
        <p>
          [
          {movie.genres.map(
            (genre, i) => ` ${i > 0 ? " | " : ""}${genre.name} `
          )}
          ]
        </p>
        <p className='detailsParagraph'>{movie.overview}</p>
        <h3 className='detailsParagraph'>
          {movie.release_date
            ? movie.release_date.replaceAll("-", " / ")
            : "no release date"}
        </h3>

        <div className='circleBar'>
          <p className='score'>User Score</p>
          <CircularProgressbar
            className='circle'
            value={movie.vote_average * 10}
            text={`${movie.vote_average * 10}%`}
            strokeWidth={7}
            styles={buildStyles({
              textColor: "#26c485",
              textSize: "23px",
              trailColor: "rgba(38, 193, 129, 0.3)",
              pathColor: "#26c485"
            })}
          />
        </div>

        <Line color='#26C485' />

        {video.length > 0 && (
          <div className='trailer'>
            <iframe
              width='500'
              height='345'
              src={`https://www.youtube.com/embed/${video[video.findIndex(video => video.type === "Trailer")].key}`}
            ></iframe>
          </div>
        )}

        <h1 className='secondSectionTitle'>Director(s)</h1>
        <div className='castContainer crewJustify'>
          {credits &&
            credits.crew
              .filter(member => member.job === "Director")
              .map(member =>
                castPresentation(member.profile_path, member.name, member.id)
              )}
        </div>
        <h1 className='secondSectionTitle'>Cast</h1>
        <div className='castContainer castJustify'>
          {credits &&
            credits.cast.map(member =>
              castPresentation(
                member.profile_path,
                member.name,
                member.id,
                member.character
              )
            )}
        </div>
        <h1 className='secondSectionTitle'>Similar Movies</h1>
        <div className='similarContainer'>
          {similar &&
            similar.map(movie =>
              similarMovies(movie.poster_path, movie.original_title, movie.id)
            )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
