import { googleProvider } from '../constants/firebaseConfig';

export default class AuthUtil {
  constructor(firebaseAuth) {
    this.auth = firebaseAuth;
  }

  doSignInWithGoogle = () => this.auth.signInWithPopup(googleProvider);

  doSignOut = () => this.auth.signOut();
}
