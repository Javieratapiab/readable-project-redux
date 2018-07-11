import React, { Component } from 'react';
import './App.css';
import Categories from './categories/index';
import Post from './posts/post/index';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from '../NotFound'

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Categories} />
            <Route path="/:category" exact component={props => <Categories {...props} />} />
            <Route path="/categories/:id" exact component={props => <Post {...props} />} />
            <Route path="*" exact component={NotFound}/>
          </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
