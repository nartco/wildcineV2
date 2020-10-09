import React from "react";
import "../css/searchbar.css";
import Search from "@material-ui/icons/Search";

const SearchBar = props => {
  return (
    <div class='container'>
      <a class='searchBtn'>
        <i>
          <Search />
        </i>
      </a>
      <input type='text' name='' class='searchTxt' placeholder='Search...' />
    </div>
  );
};
export default SearchBar;
