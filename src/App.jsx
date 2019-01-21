import './App.css'
import React, { Component } from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import Navbar from './components/navbar/Navbar';
import Helmet from 'react-helmet';
import UserRoute from './components/user-route/UserRoute';
import Admin from './routes/admin/Admin';
import Home from './routes/home/Home';
import SignIn from './routes/sign-in/SignIn';

class App extends Component {

  render() {
    const { isAuthenticated, isAdmin, location, isLoaded } = this.props;
    if (!isLoaded) {
      return (<Loader />);
    }
    const routes = isAuthenticated ?
      (
        <React.Fragment>
          <Helmet defaultTitle="Tikket" />
          <Navbar admin={isAdmin} />
          <Switch location={location}>
            <UserRoute path="/" authenticated={isAdmin} component1={Admin} component2={Home} />
            <Route path="/ticket/:id" component={Home} />
          </Switch>
        </React.Fragment>
      )
      :
      (
        <Switch location={location}>
          <Route exact path="/" component={SignIn} />
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
