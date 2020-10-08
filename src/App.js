import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./scenes/Home";
import Discover from "./scenes/Discover";
import Search from "./scenes/Search";
import Favorite from "./scenes/Favorite";
import MovieDetails from "./scenes/MovieDetails";
import Upcoming from "./scenes/Upcoming";
import Navbar from "./components/Navbar";

import './css/App.css'

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/discover'>
          <Discover />
        </Route>
        <Route path='/upcoming'>
          <Upcoming />
        </Route>
        <Route path='/details'>
          <MovieDetails />
        </Route>
        <Route path='/favorite'>
          <Favorite />
        </Route>
        <Route path='/search'>
          <Search />
        </Route>
      </Switch>
    </Router>
  );
}
