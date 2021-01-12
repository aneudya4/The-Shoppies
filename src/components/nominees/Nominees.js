import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../movie-card/MovieCard';
import { NomineesContext } from '../../appContext';

const Nominees = () => {
  const { nominees } = useContext(NomineesContext);

  console.log(nominees);
  return (
    <section className='container'>
      <h2>Nominees</h2>

      {nominees.length === 0 && (
        <div className='add-nominees-msg '>
          Go to <Link to='/'>Search Movies</Link> to add your nominees
        </div>
      )}
      <div className='nominees'>
        {nominees.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default Nominees;
