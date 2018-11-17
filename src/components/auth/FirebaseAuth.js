import React from 'react';
import { FirebaseAuthContext } from './FirebaseAuthProvider';

export default ({ children }) => (
  <FirebaseAuthContext.Consumer>{value => children(value)}</FirebaseAuthContext.Consumer>
);
