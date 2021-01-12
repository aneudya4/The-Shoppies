import React from 'react';
import noResultsImg from '../images/no-results.svg';
import './no-results.css';
const NoResults = ({ searchTerm }) => {
  const message = searchTerm
    ? `There is no results for ${searchTerm}`
    : 'Type in the input box to begging search';
  return (
    <div className='no-results'>
      {<p>{message}</p>}

      <div className='img-container'>
        <img src={noResultsImg} alt='no results' />
      </div>
    </div>
  );
};
export default NoResults;
