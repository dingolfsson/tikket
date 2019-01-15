import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'

class Logout extends Component {
  // Dispatch: When component is loaded, user is logged out and redirected
  componentDidMount() {
    this.props.onLogout()
  }

  render() {
    return <Redirect to='/' />
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.signOut()) // <-- Navbar uses this dispatch
  }
}

export default connect(null, mapDispatchToProps)(Logout)
