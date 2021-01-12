import React, { useContext } from 'react';
import MovieCard from '../movie-card/MovieCard';
import { NomineesContext } from '../../appContext';
const Nominees = () => {
  const { nominees } = useContext(NomineesContext);

  return (
    <section className='container'>
      <h2>Nominees</h2>

      <div className='nominees'>
        {nominees.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default Nominees;
