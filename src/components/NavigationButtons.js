import React from "react";

const NavigationButtons = props => {
  const {
    index,
    maxPage,
    pageSelect,
    handleSelectPage,
    handlePrevNext
  } = props;
  return (
    <div className='buttonContainer'>
      <button
        disabled={index === "1" ? true : false}
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
  );
};

export default NavigationButtons;
