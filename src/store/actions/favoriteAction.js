export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';


export const toggleFav = id => {
    id = id.toString()
    return { type: TOGGLE_FAVORITE, movie: id };
  };