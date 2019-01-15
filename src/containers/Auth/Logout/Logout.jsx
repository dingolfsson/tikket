import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'

class Logout extends Component {
  // Dispatch: When component is loaded, user is logged out and redirected
  componentDidMount() {
    this.props.onLogout()
  }
  // render: redirects logged out user
  render() {
    return <Redirect to='/' />
  }
}

const mapDispatchToProps = dispatch => {
  // Dispatch: inLogout is a dispatch to log out the signed in user
  return {
    onLogout: () => dispatch(actions.signOut())
  }
}

export default connect(null, mapDispatchToProps)(Logout)
