import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import Theaters from "@material-ui/icons/Theaters";
import Clear from "@material-ui/icons/Clear";

import "../css/navbar.css";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [show, setShow] = useState(false);

  return (
    <nav>
      <ul className='navLink'>
        <li className='logo'>
          <Theaters
            style={{
              position: "absolute",
              top: "0.5rem",
              left: 17,
              fontSize: 31,
              color: "#26C485"
            }}
          />
          <h1 className='titleLogo'>WildCiné</h1>
        </li>
        <li className={show ? "search" : "search hidden"}>
          <SearchBar />
        </li>
        <li className={show ? "link" : "link hidden"}>
          <NavLink
            onClick={() => setShow(false)}
            style={{ textDecoration: "none", color: "#fff" }}
            to='/'
          >
            <p className='navSection'>HOME</p>
          </NavLink>
        </li>
        <li className={show ? "link" : "link hidden"}>
          <NavLink
            onClick={() => setShow(false)}
            style={{ textDecoration: "none", color: "#fff" }}
            to='/discover/?page=1'
          >
            <p className='navSection'>DISCOVER</p>
          </NavLink>
        </li>
        <li className={show ? "link" : "link hidden"}>
          <NavLink
            onClick={() => setShow(false)}
            style={{ textDecoration: "none", color: "#fff" }}
            to='/upcoming/?page=1'
          >
            <p className='navSection'>UPCOMING</p>
          </NavLink>
        </li>
        <li className={show ? "link" : "link hidden"}>
          <NavLink
            onClick={() => setShow(false)}
            style={{ textDecoration: "none", color: "#fff" }}
            to='/favorite'
          >
            <p className='navSection'>FAVORITE</p>
          </NavLink>
        </li>
        <li className={show ? "link searchMobile" : "link searchMobile hidden"}>
          <NavLink
            onClick={() => setShow(false)}
            style={{ textDecoration: "none", color: "#fff" }}
            to='/favorite'
          >
            <p className='navSection'>SEARCH</p>
          </NavLink>
        </li>
        <li className='btn' onClick={() => setShow(!show)}>
          {show ? (
            <Clear style={{ color: "#26c495", fontSize: 30 }} />
          ) : (
            <MenuIcon style={{ color: "#26c485", fontSize: 30 }} />
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
