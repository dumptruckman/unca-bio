import React from 'react';
import FirebaseAuth from './FirebaseAuth';
import Button from '@material-ui/core/Button';
import { googleProvider } from '../../config/constants';

export default () => (
  <FirebaseAuth>
    {({ isAuthed, auth, authUser }) => (
      <Button
        color="inherit"
        onClick={() => {
          if (!isAuthed) {
            auth().signInWithPopup(googleProvider);
          } else {
            auth().signOut();
          }
        }}
      >
        {isAuthed ? 'Logout' : 'Login'}
      </Button>
    )}
  </FirebaseAuth>
);
