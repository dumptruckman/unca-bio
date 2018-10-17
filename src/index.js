import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import createBrowserHistory from 'history/createBrowserHistory';
import { Redirect, Route, Router } from 'react-router';
import { FirestoreProvider } from 'react-firestore';
import firebase from 'firebase';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Login from './features/Login';
import Home from './features/Home';
import SpecimenDetail from './features/SpecimenDetail';
import './config/constants';
import 'firebase/firestore';
import DefaultLayout from './DefaultLayout';

const customHistory = createBrowserHistory();

const Root = () => (
  <FirestoreProvider firebase={firebase}>
    <Router history={customHistory}>
      <div>
        <Route path="/login" component={Login} />
        <Route path="/app/home" component={Home} />
        <Route path="/specimen/:id" component={SpecimenDetail} />
        <DefaultLayout exact path="/" component={App} title="Master" />
      </div>
    </Router>
  </FirestoreProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

registerServiceWorker();
