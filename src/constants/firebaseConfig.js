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

const firestore = firebase.firestore();

const settings = { /* your settings... */ timestampsInSnapshots: true };
firestore.settings(settings);

firestore.enablePersistence().catch(function(err) {
  if (err.code === 'failed-precondition') {
    console.log('Cannot use persistence in multiple tabs.', err);
    firebase.firestore().disableNetwork();
  } else if (err.code === 'unimplemented') {
    console.log('Browser does not support persistence.', err);
    firebase.firestore().disableNetwork();
  }
});

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseAuth = firebase.auth();
export const db = firestore;
