import React, { lazy, Suspense } from 'react';
import Movies from '../movies/Movies';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import Spinner from '../spinner/Spinner';

import NavBar from '../navbar/NavBar';
const Nominees = lazy(() => import('../nominees/Nominees'));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <NavBar />
      <h1> The Shoppies: Movie awards for entrepreneurs</h1>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path='/movies/nominees' component={Nominees} />
          <Route exact path='/' component={Movies} />
          <Redirect to='/' />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}
