import './App.css'
import React, { Component } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Navbar from './components/ui/Navbar/Navbar';
import UserRoute from './components/user/UserRoute';
import User from './components/user/User';
import Admin from './components/admin/Admin';
import Dashboard from './components/dashboard/Dashboard';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import TicketDetails from './components/tickets/TicketDetails';
import CreateTicket from './components/tickets/CreateTicket';

class App extends Component {

  render() {
    const { isAuthenticated, isAdmin, isLoaded } = this.props;
    if (!isLoaded) {
      return (<Loader />);
    }
    const routes = isAuthenticated ?
      (
        <React.Fragment>
          <Helmet defaultTitle="Tikket" />
          <Navbar admin={isAdmin} />
          <Switch>
            <Route path="/profile" component={User} />
            <Route exact path='/ticket/new' component={CreateTicket} />
            <Route path="/ticket/:id" component={TicketDetails} />
            <UserRoute path="/" authenticated={isAdmin} component1={Admin} component2={Dashboard} />
          </Switch>
        </React.Fragment>
      )
      :
      (
        <Switch>
          <Route exact path="/new" component={SignUp} />
          <Route path="/" component={SignIn} />
        </Switch>
      )

    return (
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    );
  }
}


const mapStateToProps = state => {
  const admin = state.firebase.profile.admin

  return {
    isAuthenticated: state.firebase.auth.uid !== undefined,
    isAdmin: admin,
    isLoaded: state.firebase.profile.isLoaded
  }
}

export default connect(mapStateToProps)(App);
