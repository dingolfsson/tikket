import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import { Container, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux'

import Navbar from './components/ui/Navbar/Navbar';
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import TicketDetails from './components/tickets/TicketDetails'
import Admin from './components/admin/Admin';
import CreateTicket from './components/tickets/CreateTicket';

class App extends Component {
  render() {
    const { isAuthenticated, isAdmin, isLoaded } = this.props;
    if (!isLoaded) {
      return <Loader />
    }
    const switches = isAuthenticated ? (
      <div>
        <Navbar admin={isAdmin} />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/ticket/new' component={CreateTicket} />
          <Route exact path='/ticket/:id' component={TicketDetails} />
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
      );
    return (
      <BrowserRouter>
        {switches}
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  const admin = state.firebase.profile.admin;
  return {
    isAuthenticated: state.firebase.auth.uid !== undefined,
    isAdmin: admin,
    isLoaded: state.firebase.profile.isLoaded
  };
};

export default connect(mapStateToProps)(App);