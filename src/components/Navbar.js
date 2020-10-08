import React from "react";
import { NavLink } from "react-router-dom";

import "../css/navbar.css";

const Navbar = () => {
  return (
    <header>
      <div className='logo'>
        <NavLink to='/' style={{ textDecoration: "none" }}>
          <h1>WildCine</h1>
        </NavLink>
      </div>
      <ul className='navLink'>
        <li className='link'>
          <NavLink style={{ textDecoration: "none" }} to='/'>
            Home
          </NavLink>
        </li>
        <li className='link'>
          <NavLink style={{ textDecoration: "none" }} to='/discover'>
            Discover
          </NavLink>
        </li>
        <li className='link'>
          <NavLink style={{ textDecoration: "none" }} to='/upcoming'>
            Upcoming
          </NavLink>
        </li>
        <li className='link'>
          <NavLink style={{ textDecoration: "none" }} to='/favorite'>
            Favorite
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
