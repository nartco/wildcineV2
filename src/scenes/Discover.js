import React, { useState, useEffect, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import { Redirect, useLocation } from "react-router-dom";
import axios from "axios";
import ISO6391 from "iso-639-1";
import Modal from "@material-ui/core/Modal";
import queryString from "query-string";

import SearchParams from "../components/SearchParams";
import DisplayMovies from "../components/DisplayMovies";
import LoaderCustom from "../components/Loader";

const Discover = props => {
  const location = useLocation();

  let { page, year, genders, sortBy, language } = queryString.parse(
    location.search
  );

  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [movies, setMovies] = useState();
  const [redirect, setRedirect] = useState(false);
  const [maxPage, setMaxPage] = useState(null);
  const [index, setIndex] = useState(parseInt(page));

  console.log(index);

  const ref = React.createRef();

  const getMovie = useCallback(() => {
    setRedirect(false);
    setIsLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${
          process.env.REACT_APP_MOVIE_KEY
        }${
          sortBy ? "&sort_by=" + sortBy : ""
        }&include_adult=false&include_video=false&page=${index}${
          !!year ? `&year=${year}` : ""
        }${genders ? `&with_genres=${genders}` : ""}${
          !!language ? `&with_original_language=${language}` : ""
        }`
      )
      .then(response => {
        console.log(response);
        setMovies(response.data.results);
        setMaxPage(response.data.total_pages);
        setIsLoading(false);
      })
      .catch(error => {
        setErrors(errors.concat(error.message));
        setIsLoading(false);
      });
  }, [index, errors, genders, year, sortBy, language]);

  const handleModal = () => setOpen(!open);

  const handlePrevNext = e => {
    if (index <= 0) {
      setIndex(1);
    } else if (index > maxPage) {
      setIndex(maxPage);
    }
    if (e === "next") {
      setIndex(parseInt(page) + 1);
    } else if (e === "prev") {
      setIndex(parseInt(page) - 1);
    }
    setRedirect(true);
  };

  const handleSelectPage = i => {
    setIndex(i);
    setRedirect(true);
  };

  const pageSelect = () => {
    let pageArray = [];
    for (let i = 1; i <= maxPage; i++) {
      pageArray.push(<option key={i} value={i}>{i}</option>);
    }
    console.log(pageArray);
    return pageArray;
  };

  useEffect(() => {
    setIndex(page);
    getMovie();
  }, [getMovie, page]);

  if (redirect) {
    return (
      <Redirect
        push
        to={`/discover/?page=${index.toString()}${
          !!year ? `&year=${year}` : ""
        }${genders ? `&genders=${genders}` : ""}${
          !!language ? `&language=${language}` : ""
        }${sortBy ? "&sortBy=" + sortBy : ""}`}
      />
    );
  }

  return (
    <div>
      <Modal
        open={open}
        ref={ref}
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
            language={language ? ISO6391.getName(language) : ""}
            sortBy={sortBy ? sortBy : "popularity.desc"}
            year={!!year ? year : ""}
            genders={genders ? genders.split(",").map(Number) : []}
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
            <button
              disabled={index === '1' ? true : false}
              onClick={() => handlePrevNext("prev")}
              className='pageButtons'
            >
              prev
            </button>

            <select
              className='pageButtons pageSelect'
              value={index}
              onChange={e => handleSelectPage(e.target.value)}
            >
              {pageSelect()}
            </select>

            <button
            disabled={index === maxPage.toString() ? true : false}
              onClick={() => handlePrevNext("next")}
              className='pageButtons'
            >
              next
            </button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Discover;

// check prevnext quand index === 1 et prev
