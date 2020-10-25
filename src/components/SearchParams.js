import React, { useState } from "react";
import ISO6391 from "iso-639-1";
import { Redirect } from "react-router-dom";

import RotateLeft from "@material-ui/icons/RotateLeft";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import "../css/searchParams.css";

const SearchParams = React.forwardRef((props, ref) => {
  const { handleModal } = props;
  const [genders, setGenders] = useState(props.genders);
  const [language, setLanguage] = useState(props.language);
  const [year, setYear] = useState(props.year);
  const [sortBy, setSortBy] = useState(props.sortBy);
  const [redirect, setRedirect] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState([]);

  const handleGender = gender => {
    const index = genders.indexOf(gender);
    let gendersCopy = [...genders];
    index === -1 ? gendersCopy.push(gender) : gendersCopy.splice(index, 1);
    setGenders(gendersCopy);
  };

  const getIsoLanguage = e => {
    setLanguage(e);
    const index = error.indexOf("language");
    const format = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
    let errorCopy = [...error];
    if (e.length === 0) {
      errorCopy.length > 1
        ? (errorCopy = errorCopy.splice(index, 1))
        : (errorCopy = []);
      setDisabled(false);
      return setError(errorCopy);
    }
    if (format.test(e) || !!!ISO6391.getCode(e)) {
      index !== -1
        ? (errorCopy = errorCopy)
        : (errorCopy = [...error, "language"]);
      setDisabled(true);
    } else {
      errorCopy.length > 1
        ? (errorCopy = errorCopy.splice(index, 1))
        : (errorCopy = []);
      setDisabled(false);
    }
    return setError(errorCopy);
  };

  const handleYear = e => {
    setYear(e);
    const actualDate = new Date();
    const actualYear = actualDate.getFullYear();
    const index = error.indexOf("year");
    let errorCopy = [...error];
    if (e.length === 0) {
      errorCopy.length > 1
        ? (errorCopy = errorCopy.splice(index, 1))
        : (errorCopy = []);
      setDisabled(false);
      return setError(errorCopy);
    }

    if (!(e >= 1883 && e <= actualYear + 25)) {
      setDisabled(true);
      index !== -1 ? (errorCopy = errorCopy) : (errorCopy = [...error, "year"]);
    } else {
      errorCopy.length > 1
        ? (errorCopy = errorCopy.splice(index, 1))
        : (errorCopy = []);
      setDisabled(false);
    }
    return setError(errorCopy);
  };

  // CHECK HANDLE YEAR ERROR ARRAY

  const handleEraseAll = () => {
    setGenders([]);
    setLanguage("");
    setYear("");
    setSortBy("popularity.desc");
  };

  const handleConfirm = async () => {
    const iso = ISO6391.getCode(language);
    setError([]);
    setGenders(genders);
    setSortBy(sortBy);
    setLanguage(iso);
    setRedirect(true);
  };

  const setActiveButton = gender =>
    genders.indexOf(gender) !== -1 ? "genderButtonActive" : "genderButton";

  const setInputError = input =>
    error.indexOf(input) !== -1 ? "genderInput inputError" : "genderInput";

  if (redirect) {
    setTimeout(() => handleModal(), 200);
    return (
      <Redirect
        push
        to={`/discover/?page=1${!!year ? `&year=${year}` : ""}${
          genders ? `&genders=${genders}` : ""
        }${!!language ? `&language=${language}` : ""}${
          sortBy ? "&sortBy=" + sortBy : ""
        }`}
      />
    );
  }

  return (
    <div ref={ref}>
      <div className='settingsCard'>
        <h1 className='genderTitle'>Genres</h1>
        <div className='genderButtons'>
          <span
            className={setActiveButton(28)}
            onClick={() => handleGender(28)}
          >
            Action
          </span>
          <span
            className={setActiveButton(12)}
            onClick={() => handleGender(12)}
          >
            Adventure
          </span>
          <span
            className={setActiveButton(16)}
            onClick={() => handleGender(16)}
          >
            Animation
          </span>
          <span
            className={setActiveButton(35)}
            onClick={() => handleGender(35)}
          >
            Comedy
          </span>
          <span
            className={setActiveButton(80)}
            onClick={() => handleGender(80)}
          >
            Crime
          </span>
          <span
            className={setActiveButton(99)}
            onClick={() => handleGender(99)}
          >
            Documentary
          </span>
          <span
            className={setActiveButton(18)}
            onClick={() => handleGender(18)}
          >
            Drama
          </span>
          <span
            className={setActiveButton(10751)}
            onClick={() => handleGender(10751)}
          >
            Family
          </span>
          <span
            className={setActiveButton(14)}
            onClick={() => handleGender(14)}
          >
            Fantasy
          </span>
          <span
            className={setActiveButton(36)}
            onClick={() => handleGender(36)}
          >
            History
          </span>
          <span
            className={setActiveButton(27)}
            onClick={() => handleGender(27)}
          >
            Horror
          </span>
          <span
            className={setActiveButton(10402)}
            onClick={() => handleGender(10402)}
          >
            Music
          </span>
          <span
            className={setActiveButton(9648)}
            onClick={() => handleGender(9648)}
          >
            Mystery
          </span>
          <span
            className={setActiveButton(10749)}
            onClick={() => handleGender(10749)}
          >
            Romance
          </span>
          <span
            className={setActiveButton(878)}
            onClick={() => handleGender(878)}
          >
            Science Fiction
          </span>
          <span
            className={setActiveButton(10770)}
            onClick={() => handleGender(10770)}
          >
            TV Movie
          </span>
          <span
            className={setActiveButton(53)}
            onClick={() => handleGender(53)}
          >
            Thriller
          </span>
          <span
            className={setActiveButton(10752)}
            onClick={() => handleGender(10752)}
          >
            War
          </span>
          <span
            className={setActiveButton(37)}
            onClick={() => handleGender(37)}
          >
            Western
          </span>
        </div>
        <h1 className='genderTitle'>Original Language</h1>
        <input
          type='text'
          id='lg'
          name='lg'
          className={setInputError("language")}
          placeholder='english...'
          value={language}
          autoComplete='off'
          onChange={e => getIsoLanguage(e.target.value)}
        ></input>
        <h1 className='genderTitle'>Year</h1>
        <input
          type='number'
          id='year'
          name='year'
          min='1883'
          className={setInputError("year")}
          placeholder='min: 1883'
          value={year}
          autoComplete='off'
          onChange={e => handleYear(e.target.value)}
        ></input>
        <h1 className='genderTitle'>Sort By</h1>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className='genderInput'
        >
          <option value='popularity.asc'>Popularity | asc</option>
          <option value='release_date.asc'>Release date | asc</option>
          <option value='vote_average.asc'>Vote average | asc</option>
          <option value='popularity.desc'>Popularity | desc (default)</option>
          <option value='release_date.desc'>Release date | desc</option>
          <option value='vote_average.desc'>Vote average | desc</option>
        </select>

        <div className='genderActions'>
          <button onClick={() => handleEraseAll()} className='actionsButton'>
            <RotateLeft
              style={{
                fontSize: 60,
                transition: "0.1s"
              }}
              className={"actionsIcon"}
            />
          </button>
          <button
            onClick={() => handleConfirm()}
            className='actionsButton'
            disabled={disabled}
          >
            <CheckCircleOutlineIcon
              style={{
                fontSize: 60,
                transition: "0.2s"
              }}
              className={"actionsIcon"}
            />
          </button>
        </div>
      </div>
    </div>
  );
});

export default SearchParams;

// erase ? "actionButton actionButtonActive"
