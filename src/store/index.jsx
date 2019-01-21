import thunk from 'redux-thunk'
import { getFirestore } from 'redux-firestore'
import { getFirebase } from 'react-redux-firebase'
import { createStore, applyMiddleware, compose } from 'redux'
import createRootReducer from './reducers/rootReducer'
import '../config/firebase'
import 'firebase/auth'
import 'firebase/firestore'

// Initilised State
const initialState = {}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// : function
// return: store
export default () => {
  return createStore(
    createRootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })))
  )
}
