import React from 'react';

export const FirebaseAuthContext = React.createContext({
  isAuthed: false,
  authUser: null,
  auth: null,
});

class FirebaseAuthProvider extends React.Component {
  state = {
    authUser: null,
  };

  componentDidMount() {
    console.log(this.props.firebaseAuth());
    this.props.firebaseAuth().onAuthStateChanged(authUser => {
      authUser ? this.setState({ authUser }) : this.setState({ authUser: null });
    });
  }

  render() {
    const { authUser } = this.state;

    return (
      <FirebaseAuthContext.Provider
        value={{
          isAuthed: authUser != null,
          authUser,
          auth: this.props.firebaseAuth,
        }}
      >
        {this.props.children}
      </FirebaseAuthContext.Provider>
    );
  }
}

export default FirebaseAuthProvider;
