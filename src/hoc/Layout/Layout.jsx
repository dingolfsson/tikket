import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../Aux/Aux';

// Layout.jsx
// Layout: Component
// @return jsx
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
      <div>
        <Aux>
        </Aux>
      </div>
    )
  }
}

// mapStateToProps: function
// @Description: Validate if user is authenticated
// @params state
// @return [isAuthenticated: boolean]
const mapStateToProps = state => {
  return {
    isAuthenticated: state.firebase.auth.uid !== null
  };
};

export default connect(mapStateToProps)(Layout);