import React, { useState, useEffect, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import { useLocation, Redirect } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

import Error from "../components/Error";
import NavigationButtons from "../components/NavigationButtons";
import DisplayMovies from "../components/DisplayMovies";
import LoaderCustom from "../components/Loader";

import "../css/search.css";

const Search = () => {
  const location = useLocation();
  let { page, q } = queryString.parse(location.search);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState(q);
  const [errors, setErrors] = useState([]);
  const [movies, setMovies] = useState();
  const [maxPage, setMaxPage] = useState("");
  const [index, setIndex] = useState(parseInt(page));
  const [redirect, setRedirect] = useState(false);
  const [redirectMobile, setRedirectMobile] = useState(false);

  console.log(q);

  const getMovie = useCallback(() => {
    setRedirectMobile(false);
    setRedirect(false);
    setIsLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&query=${search}&page=${index}&include_adult=false`
      )
      .then(response => {
        setMovies(response.data.results);
        setMaxPage(response.data.total_pages);
        setIsLoading(false);
      })
      .catch(error => {
        setErrors(errors.concat(error.message));
        setIsLoading(false);
      });
  }, [errors, index, search]);

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
      pageArray.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return pageArray;
  };

  useEffect(() => {
    setSearch(q);
    setIndex(page);
    getMovie();
    return () => {
      setRedirect(false);
    };
  }, [getMovie, page, q, redirect]);

  if (errors.length > 0) {
    return <Error />;
  }

  const submitHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    let inputCopy = input.trim().toLowerCase();

    if (inputCopy.length > 0) {
      setRedirectMobile(true);
    } else {
      setInput("EMPTY");
    }
  };

  if (redirectMobile) {
    return <Redirect push to={`/search/?page=1&q=${input}`} />;
  }

  if (redirect) {
    return <Redirect push to={`/search/?page=${index}&q=${search}`} />;
  }

  return (
    <React.Fragment>
      {isLoading ? (
        <LoaderCustom />
      ) : (
        <React.Fragment>
          <form onSubmit={e => submitHandler(e)}>
            <input
              className='searchM genderInput'
              type='text'
              placeholder='Search...'
              value={input}
              onChange={e => setInput(e.target.value)}
              onFocus={e => e.target.select()}
            />
          </form>

          {!!search && (
            <React.Fragment>
              <Grid container className='searchContainer' spacing={1}>
                <DisplayMovies movies={movies} />
              </Grid>

              <NavigationButtons
                handleSelectPage={handleSelectPage}
                handlePrevNext={handlePrevNext}
                index={index}
                maxPage={maxPage}
                pageSelect={pageSelect}
              />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Search;

// passer l'index dans les params de l'url
