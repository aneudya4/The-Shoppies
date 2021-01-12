import React, { useState, useEffect, useContext } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import MovieCard from '../movie-card/MovieCard';
import NoResults from '../no-results/NoResults';
import { MoviesContext } from '../../appContext';
import Spinner from '../spinner/Spinner';
import './movies.css';
const Movies = ({ history }) => {
  const location = useLocation();
  const { q = '' } = queryString.parse(location.search);

  const [searchValue, setSearchValue] = useState(q);
  const [isLoading, setIsLoading] = useState(false);
  const { movies, dispatchMovies } = useContext(MoviesContext);

  useEffect(() => {
    if (searchValue.length > 2) {
      // api wont return movies with search terms less than 2 chars
      const fetchMovies = async () => {
        try {
          setIsLoading(true);
          const results = await fetch(
            `https://www.omdbapi.com/?s=${searchValue}&apikey=a811f389`
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

  const renderResults = () => {
    return movies.searchedMovies.length > 0 ? (
      movies.searchedMovies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))
    ) : (
      <NoResults searchTerm={searchValue} />
    );
  };
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    history.push(`?q=${e.target.value}`);
  };
  return (
    <div className='search-movies container'>
      <label htmlFor='search'>
        <i className='fas fa-search' />

        <input
          id='search'
          value={searchValue}
          onChange={handleSearch}
          placeholder='Search'
          autoComplete='off'
        />
      </label>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className='movies'>{renderResults()}</div>
      )}
    </div>
  );
};

export default Movies;
