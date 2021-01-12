const nomineesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NOMINEE':
      const newState = [...state, action.payload];
      localStorage.setItem('nominees', JSON.stringify(newState));

      return newState;
    case 'REMOVE_NOMINEE':
      const filteredNomines = state.filter(
        (nominee) => nominee.imdbID !== action.payload
      );
      localStorage.setItem('nominees', JSON.stringify(filteredNomines));
      return filteredNomines;

    case 'REMOVE_ALL_NOMINEES':
      localStorage.removeItem('nominees');
      return [];
    default:
      return state;
  }
};
export default nomineesReducer;
