import React from 'react';
import { withFirestore } from 'react-firestore';
import AuthUtil from '../../util/AuthUtil';
import { googleProvider } from '../../constants/firebaseConfig';

export const FirebaseAuthContext = React.createContext({
  isAuthed: false,
  isAdmin: false,
  isContributor: false,
  authUser: null,
  userInfo: null,
  auth: null,
  doReauthenticate: null,
  isLoading: false,
});

class FirebaseAuthProvider extends React.Component {
  state = {
    authUser: null,
    userInfo: null,
    isLoading: true,
  };

  componentDidMount() {
    const { firestore } = this.props;

    this.props.firebaseAuth.onAuthStateChanged(authUser => {
      console.log('auth changed');
      this.setState({ isLoading: true }, () => {
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
                  isLoading: false,
                });
              } else {
                authUser.delete();
                this.setState({ isLoading: false });
                alert('You are not authorized. Please check with the catalog administrator.');
              }
            })
            .catch(error => {
              this.setState({ isLoading: false });
            });
        } else {
          this.setState({ authUser: null, userInfo: null });
        }
      });
    });
  }

  render() {
    const { authUser, userInfo, isLoading } = this.state;

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
          isLoading,
        }}
      >
        {this.props.children}
      </FirebaseAuthContext.Provider>
    );
  }
}

export default withFirestore(FirebaseAuthProvider);
