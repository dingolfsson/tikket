import * as actions from './actions'
import { auth, db } from '../../config/firebase'

export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        auth.signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({ type: actions.LOGIN_SUCCESS })
        }).catch((err) => {
            dispatch({ type: actions.LOGIN_ERROR, err })
        })
    }
}


export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        auth.signOut().then(() => {
            dispatch({ type: actions.SIGNOUT_SUCCESS })
        })
    }
}

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
            dispatch({ type: actions.SIGNUP_SUCCESS })
        }).catch(err => {
            dispatch({ type: actions.SIGNUP_ERROR, err })
        })
    }
}