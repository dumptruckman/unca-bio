import React from 'react';
import { Avatar, RaisedButton } from 'material-ui';
import { logout } from '../util/auth';

const appTokenKey = 'appToken'; // also duplicated in Login.js
export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firebaseUser: JSON.parse(localStorage.getItem('firebaseUser')),
    };

    console.log('User:', this.state.firebaseUser);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    logout().then(
      function() {
        localStorage.removeItem(appTokenKey);
        this.props.history.push('/login');
        console.log('user signed out from firebase');
      }.bind(this)
    );
  }

  render() {
    return (
      <div>
        <h1>Home</h1>
        <h3>Welcome</h3>
        {this.state.firebaseUser && <Avatar src={this.state.firebaseUser.photoURL} />}

        <div>
          <RaisedButton
            backgroundColor="#a4c639"
            labelColor="#ffffff"
            label="Sign Out"
            onClick={this.handleLogout}
          />
        </div>
      </div>
    );
  }
}
