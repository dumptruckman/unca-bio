import React from 'react';
import { withFirestore } from 'react-firestore';
import AuthUtil from '../../util/AuthUtil';
import { googleProvider } from '../../config/constants';

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
          .collection('users')
          .where('email', '==', authUser.email)
          //.doc(`users/${authUser.uid}`)
          .get()
          .then(coll => {
            if (!coll.empty) {
              const user = coll.docs[0];
              const userData = user.data();

              if (userData.displayName !== authUser.displayName) {
                user.ref.set({ displayName: authUser.displayName }, { merge: true });
              }

              this.setState({
                authUser: authUser,
                userInfo: { ...userData, id: user.id },
              });
            } else {
              authUser.delete();
              alert('You are not authorized. Please check with the catalog administrator.');
            }
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
          userInfo,
          authUtil: new AuthUtil(this.props.firebaseAuth),
          doReauthenticate: () => authUser.reauthenticateWithPopup(googleProvider),
        }}
      >
        {this.props.children}
      </FirebaseAuthContext.Provider>
    );
  }
}

export default withFirestore(FirebaseAuthProvider);
