import React, { useState, useEffect, useContext } from 'react';
import MovieCard from '../movie-card/MovieCard';
import { MoviesContext } from '../../appContext';
import Spinner from '../spinner/Spinner';
import './movies.css';
const Movies = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { movies, dispatchMovies } = useContext(MoviesContext);

  useEffect(() => {
    if (searchValue.length > 2) {
      // api wont return movies with search terms less than 2 chars
      const fetchMovies = async () => {
        try {
          setIsLoading(true);
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
            setIsLoading(false);

            throw new Error();
          }
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);

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

      {isLoading ? (
        <Spinner />
      ) : (
        <div className='movies'>
          {movies.searchedMovies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
