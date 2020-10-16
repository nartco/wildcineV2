import React, { useState } from "react";
import ISO6391 from "iso-639-1";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import "../css/searchParams.css";

const SearchParams = React.forwardRef((props, ref) => {
  const { getParams } = props;
  const [genders, setGenders] = useState(props.genders);
  const [languageInput, setLanguageInput] = useState(props.language);
  const [yearInput, setYearInput] = useState(props.year);
  const [sortBy, setSortBy] = useState(props.sortBy);

  const handleGender = gender => {
    const index = genders.indexOf(gender);
    let gendersCopy = [...genders];
    index === -1 ? gendersCopy.push(gender) : gendersCopy.splice(index, 1);
    setGenders(gendersCopy);
  };

  const getIsoLanguage = lg =>
    new Promise((successCallback, failureCallback) => {
      lg = String(lg).toLocaleLowerCase();
      const format = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
      if (format.test(lg)) failureCallback("format error");
      else {
        const iso = ISO6391.getCode(lg);
        if (!iso) failureCallback("format error");
        successCallback(iso);
      }
    });

  const handleYear = y =>
    new Promise((successCallback, failureCallback) => {
      y = parseInt(y);
      const actualDate = new Date();
      const actualYear = actualDate.getFullYear();
      if (!(Number.isInteger(y) && (y >= 1883 && y <= actualYear + 25))) {
        failureCallback("invalid year");
      } else {
        successCallback(y);
      }
    });

  const handleEraseAll = () => {
    setGenders([]);
    setLanguageInput('');
    setYearInput('');
    setSortBy("popularity.desc");
  };

  const handleConfirm = async () => {
    let languageCheck;
    let yearCheck;

    !!languageInput
      ? (languageCheck = await getIsoLanguage(languageInput))
      : (languageCheck = null);
    !!yearInput
      ? (yearCheck = await handleYear(yearInput))
      : (yearCheck = null);

    if (languageCheck !== "format error" && yearCheck !== "invalid year") {
      getParams(genders, languageCheck, yearCheck, sortBy);
    } else if (languageCheck === "format error") {
    } else if (yearCheck === "invalid year") {
    }
  };

  const setActiveButton = gender =>
    genders.indexOf(gender) !== -1 ? "genderButtonActive" : "genderButton";

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
          className='genderInput'
          placeholder='english...'
          value={languageInput}
          onChange={e => setLanguageInput(e.target.value)}
        ></input>
        <h1 className='genderTitle'>Year</h1>
        <input
          type='text'
          id='year'
          name='year'
          className='genderInput'
          placeholder='2002...'
          value={yearInput}
          onChange={e => setYearInput(e.target.value)}
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
            <HighlightOffIcon
              style={{
                fontSize: 60,
                transition: "0.1s"
              }}
              className={"actionsIcon"}
            />
          </button>
          <button onClick={() => handleConfirm()} className='actionsButton'>
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
