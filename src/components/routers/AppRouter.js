import React from 'react';
import Movies from '../movies/Movies';
import Nominees from '../nominees/Nominees';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Movies} />
        <Route exact path='/nominees' component={Nominees} />
      </Switch>
    </BrowserRouter>
  );
}
