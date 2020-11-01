import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import "../css/searchbar.css";
import Search from "@material-ui/icons/Search";

const SearchBar = props => {
  const [input, setInput] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submitHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    let inputCopy = input.trim().toLowerCase();

    if (inputCopy.length > 0) {
      setRedirect(true);
    } else {
      setInput("EMPTY");
    }
  };

  useEffect(() => {
    
    return () => {
      setRedirect(false)
    }
  }, [redirect])

  if (redirect) {
    return <Redirect push to={`/search/?page=1&q=${input}`} />;
  }

  return (
    <form onSubmit={e => submitHandler(e)}>
      <div className='container'>
        <Link to='/' className='searchBtn' href='#'>
          <i className='btnIcon '>
            <Search
              className='btnIcon'
              style={{ fontSize: 21, marginTop: 2 }}
            />
          </i>
        </Link>
        <input
          type='text'
          name=''
          className='searchTxt'
          placeholder='Search...'
          value={input}
          onChange={e => setInput(e.target.value)}
          onFocus={e => e.target.select()}
        />
      </div>
    </form>
  );
};
export default SearchBar;
