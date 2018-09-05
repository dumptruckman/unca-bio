import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import createBrowserHistory from 'history/createBrowserHistory';
import { Redirect, Route, Router } from 'react-router';
import { getMuiTheme, MuiThemeProvider } from 'material-ui';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

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
        <Route path="/login" component={App} />
        <Redirect from="/" to="/login" />
      </div>
    </Router>
  </MuiThemeProvider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

registerServiceWorker();
