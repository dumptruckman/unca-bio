import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { db } from './config/constants';

class App extends Component {
  state = {
    name: 'Welcome to React',
    suggestions: [],
  };

  componentDidMount() {
    db.doc('courses/online')
      .get()
      .then(doc => this.setState({ name: doc.data().name }));
    db.collection('suggestions').onSnapshot(collection => {
      const suggestions = collection.docs.map(doc => doc.data());
      this.setState({ suggestions });
    });
  }

  handleProjectTitle = e => {
    e.preventDefault();
    db.doc('courses/online').set({ name: this.titleName.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    // db.collection('suggestions').add({ name: this.suggestionInput.value });
    //step 1: create the reference
    const newSuggestionReference = db.collection('suggestions').doc();
    //step 2: update the reference with the data
    newSuggestionReference.set({
      name: this.suggestionInput.value,
      id: newSuggestionReference.id,
    });
  };

  render() {
    console.log(this.state.suggestions);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.name}</h1>
        </header>
        <div />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <form onSubmit={e => this.handleProjectTitle(e)}>
          <input
            type="text"
            ref={input => {
              this.titleName = input;
            }}
          />
          <button type="submit">Submit</button>
        </form>

        <form onSubmit={e => this.handleSubmit(e)}>
          <input
            type="text"
            ref={input => {
              this.suggestionInput = input;
            }}
          />
          <button type="submit">Submit</button>
        </form>
        <ul>
          {this.state.suggestions &&
            this.state.suggestions.map((topic, index) => (
              <li key={index}>
                {topic.name}
                <button
                  onClick={() =>
                    db
                      .collection('suggestions')
                      .doc(topic.id)
                      .delete()
                  }
                >
                  Delete Me
                </button>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default App;
