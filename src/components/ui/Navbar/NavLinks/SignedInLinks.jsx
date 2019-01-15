import './SignedInLinks.css'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../../../store/actions/auth'

// SignedInLinks: function
// @description: NavLinks for signed in users
// @params props
// @return jsx
const SignedInLinks = (props) => {
  return (
    <ul className='right hide-on-med-and-down test'>
      {props.profile.admin ? <li><NavLink exact activeClassName='current' to='/admin'>Admin</NavLink></li> : null}
      <li>
        <NavLink exact
          activeClassName='current'
          to='/'>
          Beiðnir
        </NavLink>
      </li>
      <li><a onClick={props.signOut}>Útskrá</a></li>
      <li><NavLink to='/' className='btn btn-floating pink lighten-1'>
        {props.profile.initials}
      </NavLink></li>
    </ul>
  )
}

// mapDispatchToProps: function
// Description: dispatch action to sign out user
// @params dispatch
// @return dispatch action
const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
