import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import App from './App'
import { createFirestoreInstance } from 'redux-firestore'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import createReduxStore from './store/index'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'moment/locale/is'
import './index.css'
require('dotenv').config()

const store = createReduxStore()

// react redux firebase
// 1. firebase instance
// 1.1 configurations
// 2. redux
// 3. firestore instance
const rrfProps = {
  firebase,
  config: { useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true },
  dispatch: store.dispatch,
  createFirestoreInstance
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>, document.getElementById('root'))
serviceWorker.register()
