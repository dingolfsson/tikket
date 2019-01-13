import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.module.css';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  }

  render() {
    return (
      <Aux>

      </Aux>
    )
  }
}

const mapStateToProps = state => {
  console.log(state)
  return {
    isAuthenticated: state.firebase.auth.uid !== null
  };
};

export default connect(mapStateToProps)(Layout);