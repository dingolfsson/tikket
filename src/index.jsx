import 'semantic-ui-css/semantic.min.css'
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'
// import configureStore, { history } from './store/index'
import App from './App';
import { createFirestoreInstance, getFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import createReduxStore from './store/index'
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'


const rrfConfig = { userProfile: 'users' } // react-redux-firebase config
const store = createReduxStore()

const rrfProps = {
  firebase,
  config: { useFirestoreForProfile: true, userProfile: 'users', attachAuthIsReady: true },
  dispatch: store.dispatch,
  createFirestoreInstance
}

// Before, if user was logged in, sign up and login link would appear before being replaced by
// SignedInLinks.js

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>, document.getElementById('root'));
serviceWorker.register();