import { googleProvider } from '../config/constants';

export default class AuthUtil {
  constructor(firebaseAuth) {
    this.auth = firebaseAuth;
  }

  doSignInWithGoogle = () => this.auth.signInWithPopup(googleProvider);

  doSignOut = () => this.auth.signOut();
}
