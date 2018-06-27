import React, { Component } from 'react';
import './App.css';
import Categories from './categories/index';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Categories} />
          <Route path="/:category" exact component={props => <Categories {...props} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;