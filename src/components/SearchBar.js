import React from "react";
import "../css/searchbar.css";
import Search from "@material-ui/icons/Search";

const SearchBar = props => {
  return (
    <div className='container'>
      <a className='searchBtn'>
        <i>
          <Search />
        </i>
      </a>
      <input type='text' name='' className='searchTxt' placeholder='Search...' />
    </div>
  );
};
export default SearchBar;
