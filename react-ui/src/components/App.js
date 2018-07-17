import React from 'react';
import './App.css';
import Categories from './categories/index';
import Post from './posts/post/index';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from '../NotFound'

/* Stateless components (pure functions) should be used wherever possible.
Stateless components are:
  - Slightly faster, and
  - Optimize memory usage over class components.
  - Addtional reading: https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc
*/
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Categories} />
      <Route path="/:category" exact component={props => <Categories {...props} />} />
      <Route path="/:category/:id" exact component={props => <Post {...props} />} />
      <Route path="*" exact component={NotFound}/>
    </Switch>
  </BrowserRouter>
);

export default App;
