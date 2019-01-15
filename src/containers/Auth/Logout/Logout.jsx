import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'

// Logout: Component
// @Describe Log out logged in user and redirect
// @return jsx
class Logout extends Component {
  // Dispatch: When component is loaded, user is logged out and redirected
  componentDidMount() {
    this.props.onLogout()
  }
  // render: function
  // @return jsx
  render() {
    return <Redirect to='/' />
  }
}

// mapDispatchToProps: function
// @Description: log out signed in user
// @params dispatch
// @return dispatch action
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.signOut())
  }
}

export default connect(null, mapDispatchToProps)(Logout)
