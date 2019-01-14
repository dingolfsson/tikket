import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'
require('dotenv').config();

// Initialize Firebase
const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDOmain: process.env.REACT_APP_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE,
  projectId: process.env.REACT_APP_PROJECT,
  storageBucket: process.env.REACT_APP_STORAGE,
  messagingSenderId: process.env.REACT_APP_MESSAGE
});

const auth = firebaseApp.auth();
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});
export { auth, db }