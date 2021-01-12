import React, { useContext } from 'react';
import { NomineesContext } from '../../appContext';
import placeHolderImg from '../images/placeholder.svg';
import './movie-card.css';

const MovieCard = ({ movie }) => {
  const { nominees, dispatchNominees } = useContext(NomineesContext);

  const handleAddNominee = () => {
    dispatchNominees({ type: 'ADD_NOMINEE', payload: movie });
  };

  const handleRemoveNominee = () => {
    dispatchNominees({ type: 'REMOVE_NOMINEE', payload: movie.imdbID });
  };
  const renderButtons = () => {
    const isNominee = nominees.find(
      (nominee) => nominee.imdbID === movie.imdbID
    );
    if (!isNominee) {
      return (
        <button
          disabled={nominees.length >= 5}
          className='add-btn btn'
          onClick={handleAddNominee}
        >
          Nominate
        </button>
      );
    }
    return (
      <button className='remove-btn btn' onClick={handleRemoveNominee}>
        Remove
      </button>
    );
  };
  const formatYear =
    movie.Year[movie.Year.length - 1] === '–'
      ? `${movie.Year}present`
      : movie.Year;
  const setImg = movie.Poster === 'N/A' ? placeHolderImg : movie.Poster;

  return (
    <div className='movie-card'>
      <div className='movie-img'>
        <img loading='lazy' src={setImg} alt={movie.Title} />
      </div>
      <div className='movie-info'>
        <p className='title'>{movie.Title}</p>
        <span className='year'>{formatYear}</span>
      </div>
      {renderButtons()}
    </div>
  );
};
export default MovieCard;
