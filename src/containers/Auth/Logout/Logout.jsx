import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'

// Logout: Component
// Action: Log out user, redirect
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
// @Description: logs out signed in user
// @params dispatch
// @return dispatch action
const mapDispatchToProps = dispatch => {
  // Dispatch: inLogout is a dispatch to log out the signed in user
  return {
    onLogout: () => dispatch(actions.signOut())
  }
}

export default connect(null, mapDispatchToProps)(Logout)
