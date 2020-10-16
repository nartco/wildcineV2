import React, { useState, useEffect, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import { Link, useParams, Redirect } from "react-router-dom";
import axios from "axios";
import ISO6391 from "iso-639-1";
import Modal from "@material-ui/core/Modal";

import SearchParams from "../components/SearchParams";
import DisplayMovies from "../components/DisplayMovies";
import LoaderCustom from "../components/Loader";

const Discover = () => {
  let { page } = useParams();
  page = parseInt(page);
  if (page <= 0) page = 1;

  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [movies, setMovies] = useState();
  const [genders, setGenders] = useState([]);
  const [language, setLanguage] = useState("");
  const [year, setYear] = useState("");
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [pageInput, setPageInput] = useState(page);
  const ref = React.createRef();

  const getMovie = useCallback(() => {
    setIsLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.REACT_APP_MOVIE_KEY
        }&sort_by=${sortBy}&include_adult=false&include_video=false&page=${page}${
          !!year ? `&year=${year}` : ""
        }${genders.length > 0 ? `&with_genres=${genders.join()}` : ""}${
          !!language ? `&with_original_language=${language}` : ""
        }`
      )
      .then(response => {
        setMovies(response.data.results);
        setIsLoading(false);
      })
      .catch(error => {
        setErrors(errors.concat(error.message));
        setIsLoading(false);
      });
  }, [page, errors, genders, year, sortBy, language]);

  const handleModal = () => setOpen(!open);

  const getParameters = (genders, language, year, sort) => {
    !!language ? setLanguage(language) : setLanguage("");
    !!year ? setYear(year) : setYear("");
    setGenders(genders);
    setSortBy(sort);
    handleModal();
  };

  const handleKeypress = e => {
    if (e.charCode === 13) {
      console.log("x");
      return <Redirect to={`/discover/${pageInput}`} />;
    }
  };

  console.log(
    !!genders +
      " \\ " +
      !!language +
      " \\ " +
      !!year +
      " \\ " +
      !!sortBy +
      pageInput
  );

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
        <div>
          <SearchParams
            handleModal={handleModal}
            getParams={getParameters}
            ref={ref}
            language={ISO6391.getName(language)}
            sortBy={sortBy}
            year={year}
            genders={genders}
          />
        </div>
      </Modal>
      {isLoading ? (
        <LoaderCustom />
      ) : (
        <React.Fragment>
          <div className='settingsButton'>
            <button onClick={() => handleModal()}>research parameters</button>
          </div>
          <Grid container style={{ marginTop: "10vh" }} spacing={1}>
            <DisplayMovies movies={movies} />
          </Grid>
          <div className='buttonContainer'>
            <Link
              style={{
                textDecoration: "none"
              }}
              to={`/discover/${page - 1}`}
            >
              <button className='pageButtons'>prev</button>
            </Link>
            <button disabled={true} className='pageButtons'>
              <input
                type='number'
                min='1'
                value={pageInput}
                onChange={e => setPageInput(e.target.value)}
                className='pageInput'
                onKeyPress={handleKeypress}
              />
              {/* {page} */}
            </button>
            <Link
              style={{
                textDecoration: "none"
              }}
              to={`/discover/${page + 1}`}
            >
              <button className='pageButtons'>next</button>
            </Link>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Discover;

// passer l'index dans les params de l'url
