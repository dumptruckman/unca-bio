import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SpecimenList from './components/SpecimenList';

class App extends Component {
  state = {
    name: 'Welcome to React',
    suggestions: [],
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">UNCA Zoology Catalog</h1>
        </header>
        <div />
        <SpecimenList />
      </div>
    );
  }
}

export default App;
