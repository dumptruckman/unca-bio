import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAdCUhN-Qqujs-7du-rz9MjpEblnaHcEHM',
  authDomain: 'unca-zoo.firebaseapp.com',
  databaseURL: 'https://unca-zoo.firebaseio.com',
  projectId: 'unca-zoo',
  storageBucket: 'unca-zoo.appspot.com',
  messagingSenderId: '69372858463',
};

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;