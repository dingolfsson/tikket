import './App.css'
import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'

import Navbar from './components/ui/Navbar/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import TicketDetails from './components/tickets/TicketDetails'
import Admin from './components/admin/Admin'
import CreateTicket from './components/tickets/CreateTicket'
import User from './components/user/User'

class App extends Component {
  // App: Primary component - fired up by index.js
  render() {
    const { isAuthenticated, isAdmin, isLoaded } = this.props
    // Condition: While the required information isn't ready, a loader will appear
    if (!isLoaded) {
      return <Loader />
    }
    // if the user is logged in (authenticated)
    // if admin, the admin console navigation appears
    // if the user isn't logged in (authenticated), user can only log in or 
    // create a new account.
    const switches = isAuthenticated ? (
      <div>
        <Navbar admin={isAdmin} />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/ticket/new' component={CreateTicket} />
          <Route exact path='/ticket/:id' component={TicketDetails} />
          <Route exact path='/profile' component={User} />
          <Route path='/admin' component={Admin} />
          <Redirect to='/' />
        </Switch>
      </div>
    ) : (<div>
      <Switch>
        <Route exact path='/' component={SignIn} />
        <Route exact path='/new' component={SignUp} />
        <Redirect to='/' />
      </Switch>
    </div>
      )
    return (
      <BrowserRouter>
        {switches}
      </BrowserRouter>
    )
  }
}

// mapStateToProps
// isAuthenticated: boolean (default: false)
// isAdmin: boolean (default: false)
// isLoaded: boolean (default: false)
// @return: [isAuthenticated, isAdmin, isLoaded]
const mapStateToProps = state => {
  const admin = state.firebase.profile.admin
  return {
    isAuthenticated: state.firebase.auth.uid !== undefined,
    isAdmin: admin,
    isLoaded: state.firebase.profile.isLoaded
  }
}

export default connect(mapStateToProps)(App)
