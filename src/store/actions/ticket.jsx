import * as actionTypes from './actionTypes'
import { db } from '../../config/firebase'

export const createTicket = (ticket) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const database = db
    const authorId = getState().firebase.auth.uid
    const profile = getState().firebase.profile
    database.collection('tickets').add({
      ...ticket,
      name: profile.name,
      authorId: authorId,
      phone: profile.phone,
      room: profile.room,
      email: profile.email,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: actionTypes.CREATE_TICKET, ticket })
    }).catch((err) => {
      dispatch({ type: actionTypes.CREATE_TICKET_ERROR, err })
    })
  }
}

export const solveTicket = (ticket, id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const database = db
    database.collection('tickets').doc(id).update({
      solved: !ticket.solved,
      solvedAt: new Date()
    }).then(() => {
      dispatch({ type: actionTypes.SOLVE_TICKET, ticket })
    }).catch((err) => {
      dispatch({ type: actionTypes.SOLVE_TICKET_ERROR, err })
    })
  }
}
