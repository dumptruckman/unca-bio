import React from 'react';
import FirebaseAuth from './FirebaseAuth';
import Button from '@material-ui/core/Button';

export default () => (
  <FirebaseAuth>
    {({ isAuthed, authUtil, authUser }) => (
      <Button
        color="inherit"
        onClick={() => {
          if (!isAuthed) {
            authUtil.doSignInWithGoogle();
          } else {
            authUtil.doSignOut();
          }
        }}
      >
        {isAuthed ? 'Logout' : 'Login'}
      </Button>
    )}
  </FirebaseAuth>
);
