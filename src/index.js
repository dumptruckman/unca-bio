import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import createBrowserHistory from 'history/createBrowserHistory';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Redirect, Route, Router } from 'react-router';

const customHistory = createBrowserHistory();

const Root = () => (
  <Router history={customHistory}>
    <div>
      <Route path="/login" component={App} />
      <Redirect from="/" to="/login" />
    </div>
  </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));

registerServiceWorker();
