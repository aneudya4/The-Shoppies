const initialState = {
  searchedMovies: [],
};
const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SEARCH_MOVIES':
      return { ...state, searchedMovies: action.payload };

    default:
      return state;
  }
};
export default moviesReducer;
