import React, { useState, useEffect, useCallback } from "react";
import Grid from "@material-ui/core/Grid";
import { useLocation, Redirect } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

import NavigationButtons from "../components/NavigationButtons";
import DisplayMovies from "../components/DisplayMovies";
import LoaderCustom from "../components/Loader";

const TopRated = () => {
  const location = useLocation();
  let { page } = queryString.parse(location.search);

  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState([]);
  const [movies, setMovies] = useState();
  const [maxPage, setMaxPage] = useState("");
  const [index, setIndex] = useState(parseInt(page));
  const [redirect, setRedirect] = useState(false);

  const getMovie = useCallback(() => {
    setRedirect(false);
    setIsLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=${index}`
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
  }, [page, errors]);

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
    setIndex(page);
    getMovie();
  }, [getMovie, page]);

  if (redirect) {
    return <Redirect push to={`/top-rated/?page=${index}`} />;
  }

  return (
    <React.Fragment>
      {isLoading ? (
        <LoaderCustom />
      ) : (
        <React.Fragment>
          <Grid container style={{ marginTop: "10vh" }} spacing={1}>
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
  );
};

export default TopRated;

// passer l'index dans les params de l'url
