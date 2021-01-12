import React from 'react';
import './banner.css';
const Banner = () => {
  return (
    <div className='banner'>
      <p>
        <i className='fas fa-award' />
        You have reached the max ammount of nominations per user.
      </p>
    </div>
  );
};

export default Banner;
