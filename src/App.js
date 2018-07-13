import React, { Component } from 'react';
import {Route, Link, Switch} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Map from './components/map';
import Frontpage from './components/frontpage';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/map" component={Map} />
          <Route path="/" component={Frontpage} />
        </Switch>
      </div>
    );
  }
}

export default App;
