import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';
const NavBar = () => {
  const query = localStorage.getItem('query');
  const formatQuery = query === '' ? '/' : `/?q=${query}`;

  return (
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to='/'>The Shoppies</NavLink>
          </li>
          <li>
            <NavLink to={formatQuery}>Search Movies</NavLink>
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
