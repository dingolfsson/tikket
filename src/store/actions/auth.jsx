import * as actionTypes from './actionTypes'
import { auth, db } from '../../config/firebase'

export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    auth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: actionTypes.LOGIN_SUCCESS })
    }).catch((err) => {
      dispatch({ type: actionTypes.LOGIN_ERROR, err })
    });
  }
}

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {

    auth.signOut().then(() => {
      dispatch({ type: actionTypes.SIGNOUT_SUCCESS });
    });
  }
}

// Firebase = sign new user up
// Firestore = communicate with firestore db
export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const database = db;

    console.log(newUser)
    auth.createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((res) => {
      return database.collection('users').doc(res.user.uid).set({
        name: newUser.name,
        phone: newUser.phone,
        room: newUser.room,
        email: newUser.email,
        admin: newUser.admin,
        superAdmin: newUser.superAdmin
      })
    }).then(() => {
      console.log('success')
      dispatch({ type: actionTypes.SIGNUP_SUCCESS })
    }).catch(err => {
      console.log('error')
      dispatch({ type: actionTypes.SIGNUP_ERROR, err })
    })
  }
}