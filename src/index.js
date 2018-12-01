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
import './constants/firebaseConfig';
import 'firebase/firestore';
import DefaultLayout from './components/DefaultLayout';
import FirebaseAuthProvider from './components/auth/FirebaseAuthProvider';
import { firebaseAuth } from './constants/firebaseConfig';
import SpecimenDetailPage from './components/detail/SpecimenDetailPage';
import Users from './components/users/Users';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Home from './components/home/Home';
import * as routes from './constants/routes';
import ScrollToTop from './components/ScrollToTop';
import SpecimenListPage from './components/SpecimenListPage';
import Import from './components/import/Import';

const customHistory = createBrowserHistory();

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

const Root = () => (
  <FirestoreProvider firebase={firebase}>
    <FirebaseAuthProvider firebaseAuth={firebaseAuth}>
      <MuiThemeProvider theme={theme}>
        <Router history={customHistory}>
          <ScrollToTop>
            <Route path="/specimen/:id" component={SpecimenDetailPage} />
            <DefaultLayout path={routes.MASTER} component={SpecimenListPage} title="Master" />
            <DefaultLayout path={routes.USERS} component={Users} title="Users" />
            <DefaultLayout path={routes.IMPORT} component={Import} title="Import" />
            <DefaultLayout exact path={routes.HOME} component={Home} title="Home" />
          </ScrollToTop>
        </Router>
      </MuiThemeProvider>
    </FirebaseAuthProvider>
  </FirestoreProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

registerServiceWorker();
