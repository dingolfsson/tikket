import './SignedInLinks.css'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../../../store/actions/auth'

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

// Only signed in users can see the logout button
// onClick a dispatch is made to log out the signed in user
const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
