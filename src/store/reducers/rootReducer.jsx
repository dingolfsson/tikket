import authReducer from './auth'
import ticketReducer from './ticket'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'

// @Desc: combines reducers
const rootReducer = combineReducers({
  auth: authReducer,
  ticket: ticketReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
})

export default rootReducer
