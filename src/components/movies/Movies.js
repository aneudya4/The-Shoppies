import React, { useState, useEffect, useContext } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import MovieCard from '../movie-card/MovieCard';
import NoResults from '../no-results/NoResults';
import { MoviesContext, NomineesContext } from '../../appContext';
import Banner from '../banner/Banner';
import Spinner from '../spinner/Spinner';
import './movies.css';
const Movies = ({ history }) => {
  const location = useLocation();
  const { q = '' } = queryString.parse(location.search);
  localStorage.setItem('query', q);

  const [searchValue, setSearchValue] = useState(q);
  const [isLoading, setIsLoading] = useState(false);
  const { movies, dispatchMovies } = useContext(MoviesContext);
  const { nominees } = useContext(NomineesContext);

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
            const filterResults = resultsJson.Search.filter(
              (item) => item.Type === 'movie'
            );

            dispatchMovies({
              type: 'SEARCH_MOVIES',
              payload: filterResults,
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

      {nominees.length === 5 && <Banner />}

      {isLoading ? (
        <Spinner />
      ) : (
        <div className='movies'>{renderResults()}</div>
      )}
    </div>
  );
};

export default Movies;
