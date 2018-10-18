import React from 'react';
import { withFirestore } from 'react-firestore';

export const FirebaseAuthContext = React.createContext({
  isAuthed: false,
  authUser: null,
  userInfo: null,
  auth: null,
});

class FirebaseAuthProvider extends React.Component {
  state = {
    authUser: null,
    userInfo: null,
  };

  componentDidMount() {
    const { firestore } = this.props;

    this.props.firebaseAuth().onAuthStateChanged(authUser => {
      if (authUser) {
        firestore
          .doc(`users/${authUser.uid}`)
          .get()
          .then(user => {
            this.setState({
              authUser,
              userInfo: user.exists ? user.data() : null,
            });
          });
      } else {
        this.setState({ authUser: null, userInfo: null });
      }
    });
  }

  render() {
    const { authUser, userInfo } = this.state;

    return (
      <FirebaseAuthContext.Provider
        value={{
          isAuthed: authUser != null,
          authUser,
          isAdmin: userInfo ? userInfo.admin : null,
          isContributor: userInfo ? userInfo.contributor : null,
          auth: this.props.firebaseAuth,
        }}
      >
        {this.props.children}
      </FirebaseAuthContext.Provider>
    );
  }
}

export default withFirestore(FirebaseAuthProvider);
