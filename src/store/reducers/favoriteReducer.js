import { TOGGLE_FAVORITE } from "../actions/favoriteAction";
import Cookies from "universal-cookie";

const cookies = new Cookies();

let initialState = { favorite: cookies.get("fav") ? cookies.get("fav") : [] };

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAVORITE:
      let favoriteCopy = [...state.favorite];
      const index = favoriteCopy.findIndex(id => id === action.movie);
      index === -1
        ? favoriteCopy.unshift(action.movie)
        : (favoriteCopy = favoriteCopy.filter(
            (item, indexFav) => indexFav !== index
          ));

      cookies.set("fav", JSON.stringify(favoriteCopy), { path: "/" });
      return { ...state, favorite: favoriteCopy };
    default:
      return state;
  }
};
