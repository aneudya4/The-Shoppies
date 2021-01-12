import React, { useReducer, useEffect } from 'react';
import { MoviesContext, NomineesContext } from '../../appContext';
import moviesReducer from '../../reducers/moviesReducer';
import nomineesReducer from '../../reducers/nomineesReducer';
import AppRouter from '../routers/AppRouter';
import './App.css';

function App() {
  const moviesInitialState = {
    searchedMovies: [],
  };
  const nomineesInitialState = [];

  const [movies, dispatchMovies] = useReducer(
    moviesReducer,
    moviesInitialState
  );
  const [nominees, dispatchNominees] = useReducer(
    nomineesReducer,
    nomineesInitialState
  );

  useEffect(() => {
    const isNominees = localStorage.getItem('nominees');
    if (isNominees) {
      dispatchNominees({
        type: 'ADD_NOMINEE_FROM_STORAGE',
        payload: JSON.parse(isNominees),
      });
    }
  }, []);
  return (
    <MoviesContext.Provider value={{ movies, dispatchMovies }}>
      <NomineesContext.Provider value={{ nominees, dispatchNominees }}>
        <div className='App'>
          <AppRouter />
        </div>
      </NomineesContext.Provider>
    </MoviesContext.Provider>
  );
}

export default App;
