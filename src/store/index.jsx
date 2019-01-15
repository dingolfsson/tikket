import thunk from 'redux-thunk'
import { getFirestore } from 'redux-firestore'
import { getFirebase } from 'react-redux-firebase'
import { createStore, applyMiddleware, compose } from 'redux'
import createRootReducer from './reducers/rootReducer'
import '../config/firebase'
import 'firebase/auth'
import 'firebase/firestore'

const initialState = {}

export default () => {
  return createStore(
    createRootReducer,
    initialState,
    compose(
      applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })))
  )
}
