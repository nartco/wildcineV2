import React, { useState, useEffect, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Modal from "@material-ui/core/Modal";

import SearchParams from "../components/SearchParams";
import DisplayMovies from "../components/DisplayMovies";

const Discover = () => {
  let { page } = useParams();
  page = parseInt(page);
  if (page <= 0) page = 1;

  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [movies, setMovies] = useState();
  const [genders, setGenders] = useState([]);
  const [language, setLanguage] = useState();
  const [year, setYear] = useState();

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

  const handleModal = () => setOpen(!open);

  const getParameters = (genders, language, year) => {
    setGenders(genders);
    setLanguage(language);
    setYear(year);
  };
  console.log(genders + " \\ " + language + " \\ " + year);

  useEffect(() => {
    getMovie(page);
  }, [getMovie, page]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleModal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <SearchParams handleModal={handleModal} getParams={getParameters} />
      </Modal>
      <Grid container style={{ marginTop: "10vh" }} spacing={1}>
        {isLoading ? null : <DisplayMovies movies={movies} />}
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
      </Grid>
      <button onClick={() => handleModal()}>SDFSDFKDOWPKFWPWOEKPKWOPKKP</button>
    </div>
  );
};

export default Discover;

// passer l'index dans les params de l'url
