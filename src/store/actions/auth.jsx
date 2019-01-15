import * as actionTypes from './actionTypes'
import { auth, db } from '../../config/firebase'

// Firebase = sign new user up
// Firestore = communicate with firestore db

// signIn: function
// @params credentials (email: string, password: string)
// @return: dispatch
export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    auth.signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: actionTypes.LOGIN_SUCCESS })
    }).catch((err) => {
      dispatch({ type: actionTypes.LOGIN_ERROR, err })
    })
  }
}

// signOut: function
// @return dispatch
export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    auth.signOut().then(() => {
      dispatch({ type: actionTypes.SIGNOUT_SUCCESS })
    })
  }
}

// signUp: funcation
// @params newUser: object
// @return dispatch
export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const database = db
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
      dispatch({ type: actionTypes.SIGNUP_SUCCESS })
    }).catch(err => {
      dispatch({ type: actionTypes.SIGNUP_ERROR, err })
    })
  }
}
