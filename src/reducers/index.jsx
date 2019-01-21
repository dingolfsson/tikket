import thunk from 'redux-thunk'
import { getFirestore, firestoreReducer } from 'redux-firestore'
import { getFirebase, firebaseReducer } from 'react-redux-firebase'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import auth from './auth';
import admin from './admin';
import '../config/firebase'

// Combine reducers
const reducers = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  auth,
  admin,
})

// Initilised State
const initialState = {
}

// : function
// return: store
export default () => {
  return createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })))
  )
}