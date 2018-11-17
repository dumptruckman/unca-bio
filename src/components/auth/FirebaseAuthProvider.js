import React from 'react';
import { withFirestore } from 'react-firestore';
import AuthUtil from '../../util/AuthUtil';

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

    this.props.firebaseAuth.onAuthStateChanged(authUser => {
      if (authUser) {
        firestore
          .doc(`users/${authUser.uid}`)
          .get()
          .then(user => {
            this.setState({
              authUser: authUser,
              userInfo: user.exists ? { ...user.data(), id: user.id } : null,
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
          employeeId: userInfo ? userInfo.employeeId : null,
          userInfo,
          authUtil: new AuthUtil(this.props.firebaseAuth),
        }}
      >
        {this.props.children}
      </FirebaseAuthContext.Provider>
    );
  }
}

export default withFirestore(FirebaseAuthProvider);
