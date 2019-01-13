import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

// Initialize Firebase
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyB-HcV2dV4YcZcnrxzWZm3L11Xxxvhvbzk",
  authDomain: "daniel-in.firebaseapp.com",
  databaseURL: "https://daniel-in.firebaseio.com",
  projectId: "daniel-in",
  storageBucket: "daniel-in.appspot.com",
  messagingSenderId: "120291802575"
});

const auth = firebaseApp.auth();
const db = firebase.firestore();
db.settings({
  timestampsInSnapshots: true
});
export { auth, db }