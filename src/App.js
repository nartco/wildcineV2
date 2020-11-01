import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./scenes/Home";
import Discover from "./scenes/Discover";
import Search from "./scenes/Search";
import Favorite from "./scenes/Favorite";
import MovieDetails from "./scenes/MovieDetails";
import Upcoming from "./scenes/Upcoming";
import Popular from "./scenes/Popular";
import TopRated from "./scenes/TopRated";
import Navbar from "./components/Navbar";

import "./css/App.css";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/discover/*'>
          <Discover />
        </Route>
        <Route path='/upcoming/*'>
          <Upcoming />
        </Route>
        <Route path='/popular/*'>
          <Popular />
        </Route>
        <Route path='/top-rated/*'>
          <TopRated />
        </Route>
        <Route path='/details/:id'>
          <MovieDetails />
        </Route>
        <Route path='/favorite'>
          <Favorite />
        </Route>
        <Route path='/search/*'>
          <Search />
        </Route>
      </Switch>
    </Router>
  );
}
