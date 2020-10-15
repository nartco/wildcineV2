import React from "react";
import "../css/searchbar.css";
import Search from "@material-ui/icons/Search";

const SearchBar = props => {
  return (
    <div className='container'>
      <a className='searchBtn' href="#">
        <i className="btnIcon ">
          <Search className="btnIcon"  style={{fontSize: 21, marginTop: 2}}/>
        </i>
      </a>
      <input type='text' name='' className='searchTxt' placeholder='Search...' />
    </div>
  );
};
export default SearchBar;
