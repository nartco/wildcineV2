import React, { useState } from "react";
import ISO6391 from "iso-639-1";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import "../css/searchParams.css";

const SearchParams = props => {
  const { getParams, handleModal } = props;
  const [genders, setGenders] = useState([]);
  const [language, setLanguage] = useState();
  const [year, setYear] = useState();
  const [languageInput, setLanguageInput] = useState("");
  const [yearInput, setYearInput] = useState("");
  const [confirm, setConfirm] = useState();
  const [erase, setErase] = useState();

  const handleGender = gender => {
    const index = genders.indexOf(gender);
    let gendersCopy = [...genders];
    index === -1 ? gendersCopy.push(gender) : gendersCopy.splice(index, 1);
    setGenders(gendersCopy);
  };

  const setActiveButton = gender =>
    genders.indexOf(gender) !== -1 ? "genderButtonActive" : "genderButton";

  const getIsoLanguage = lg =>
    new Promise((successCallback, failureCallback) => {
      lg = String(lg).toLocaleLowerCase();
      const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      if (format.test(lg)) failureCallback("format error");
      else {
        const iso = ISO6391.getCode(lg);
        iso ? setLanguage(iso) : failureCallback("format error");
        successCallback("success");
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
        setYear(y);
        successCallback("success");
      }
    });

  const handleConfirm = async () => {
    const languageCheck = await getIsoLanguage(languageInput);
    const yearCheck = await handleYear(yearInput);
    if (languageCheck === "success" && yearCheck === "success") {
      console.log(year);
      getParams(genders, language, year);
    } else if (languageCheck === "format error") {
    } else if (yearCheck === "invalid year") {
    }
  };

  const handleActionsButton = action => {
    if (action == "confirm") {
      setConfirm(true);
      handleConfirm();
    } else if (action == "erase") {
      setErase(true);
      setGenders([]);
      setLanguage();
      setYear();
    }
    setTimeout(() => {
      setConfirm(false);
      setErase(false);
    }, 1000);
  };

  return (
    <div>
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
        <h1 className='genderTitle'>Language</h1>
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

        <div className='genderActions'>
          <span onClick={() => handleActionsButton("erase")}>
            <HighlightOffIcon
              style={{
                fontSize: 60,
                transition: "0.1s"
              }}
              className={
                erase ? "actionButton actionButtonActive" : "actionButton"
              }
            />
          </span>
          <span onClick={() => handleActionsButton("confirm")}>
            <CheckCircleOutlineIcon
              style={{
                fontSize: 60,
                transition: "0.2s"
              }}
              className={
                confirm ? "actionButton actionButtonActive" : "actionButton"
              }
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SearchParams;
