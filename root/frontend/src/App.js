import React, { Component } from 'react';
import './App.css';
import Main from './components/MainTheme/Main'
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component{
  render() {
  return (
    <div>
      <Router>
            <Route
              exact
              path="/"
              render={props => <Main/>}
            />
            <Route
              exact
              path="/Main"
              render={props => <Main/>}
            />
        </Router>
    </div>
  );
  }
}

export default App;

