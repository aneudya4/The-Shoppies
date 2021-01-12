const nomineesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NOMINEE':
      return [...state, action.payload];
    case 'REMOVE_NOMINEE':
      const filteredNomines = state.filter(
        (nominee) => nominee.imdbID !== action.payload
      );
      return filteredNomines;
    case 'REMOVE_ALL_NOMINEES':
      return { ...state, nominees: [] };
    default:
      return state;
  }
};
export default nomineesReducer;
