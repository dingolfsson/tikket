import * as actionTypes from './actionTypes'
import { db } from '../../config/firebase'

// createTicket: function
// @Description: Action called when a new ticket is created.
// @params ticket: object
// @return dispatch
export const getUsers = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const database = db
    database.collection('users').get()
      .then((users) => {
        // console.log(users)
        const payload = users.docs;
        dispatch({ type: actionTypes.GET_USERS, payload })
      }).catch((err) => {
        // dispatch({ type: actionTypes.CREATE_TICKET_ERROR, err })
        console.log(err)
      })
  }
}