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
          .collection('users')
          .where('email', '==', authUser.email)
          //.doc(`users/${authUser.uid}`)
          .get()
          .then(coll => {
            if (!coll.empty) {
              const user = coll.docs[0];
              this.setState({
                authUser: authUser,
                userInfo: { ...user.data(), id: user.id },
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
