import React, { useState, useEffect, useContext } from 'react';
import MovieCard from '../movie-card/MovieCard';
import { MoviesContext } from '../../appContext';

import './movies.css';
const Movies = () => {
  const [searchValue, setSearchValue] = useState('');
  const { movies, dispatchMovies } = useContext(MoviesContext);

  useEffect(() => {
    if (searchValue.length > 2) {
      // api wont return movies with search terms less than 2 chars
      const fetchMovies = async () => {
        try {
          const results = await fetch(
            `http://www.omdbapi.com/?s=${searchValue}&apikey=a811f389`
          );
          const resultsJson = await results.json();
          if (resultsJson.Response !== 'False') {
            dispatchMovies({
              type: 'SEARCH_MOVIES',
              payload: resultsJson.Search,
            });
          } else {
            throw new Error();
          }
        } catch (error) {
          dispatchMovies({ type: 'SEARCH_MOVIES', payload: [] });
        }
      };
      fetchMovies();
    } else {
      dispatchMovies({ type: 'SEARCH_MOVIES', payload: [] });
    }
  }, [searchValue, dispatchMovies]);

  return (
    <div className='search-movies'>
      <input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <div className='movies'>
        {movies.searchedMovies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
