import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import createBrowserHistory from 'history/createBrowserHistory';
import { Redirect, Route, Router } from 'react-router';
import { MuiThemeProvider } from 'material-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Login from './features/Login';
import Home from './features/Home';

const muiTheme = getMuiTheme({
  appBar: {
    color: '#37517E',
    height: 50,
  },
});

const customHistory = createBrowserHistory();

const Root = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router history={customHistory}>
      <div>
        <Route path="/login" component={Login} />
        <Route path="/app/home" component={Home} />
        <Redirect from="/" to="/login" />
      </div>
    </Router>
  </MuiThemeProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

registerServiceWorker();
