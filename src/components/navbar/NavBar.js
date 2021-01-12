import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
const NavBar = () => {
  const query = localStorage.getItem('query');

  return (
    <header>
      <nav>
        <ul>
          <li>The Shoppies</li>
          <li>
            <NavLink to={`/?q=${query}`}>Search Movies</NavLink>
          </li>

          <li>
            <NavLink to='/movies/nominees' activeClassName='selected'>
              Nominees
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
