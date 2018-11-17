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
import Login from './components/Login';
import Home from './components/Home';
import SpecimenDetail from './components/SpecimenDetail';
import './config/constants';
import 'firebase/firestore';
import DefaultLayout from './components/DefaultLayout';
import FirebaseAuthProvider from './components/auth/FirebaseAuthProvider';
import { firebaseAuth } from './config/constants';

const customHistory = createBrowserHistory();

const Root = () => (
  <FirestoreProvider firebase={firebase}>
    <FirebaseAuthProvider firebaseAuth={firebaseAuth}>
      <Router history={customHistory}>
        <div>
          <Route path="/login" component={Login} />
          <Route path="/app/home" component={Home} />
          <Route path="/specimen/:id" component={SpecimenDetail} />
          <DefaultLayout exact path="/" component={App} title="Master" />
        </div>
      </Router>
    </FirebaseAuthProvider>
  </FirestoreProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

registerServiceWorker();
