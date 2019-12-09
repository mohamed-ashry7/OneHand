import React, { Component } from 'react';
import './App.css';
import Main from './components/MainTheme/Main'

class App extends Component{
  state = {
    item: {},
  };
  
  render() {
  return (
    <Main/>
  );
  }
}

export default App;
