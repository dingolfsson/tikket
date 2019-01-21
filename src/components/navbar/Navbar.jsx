import { Menu, Container, Icon } from 'semantic-ui-react'
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../actions/auth';
import AdminNav from './AdminNav';
import './Navbar.css'

class Navbar extends Component {
  state = { activeItem: '' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state
    const { admin, signOut } = this.props;

    if (admin) {
      return (<AdminNav {...this.props} activeItem={activeItem} />)
    }
    return (
      <React.Fragment>
        <Menu size='large' secondary>
          <Container>
            <Menu.Item header name='Tikket'>
              <img alt='logo' src='/logo5.png' />
            </Menu.Item>
            <Menu.Item name='School'>
              Hörðuvallaskóli
          </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item
                exact
                as={NavLink}
                to={'/profile'}
                name='user'
                active={activeItem === 'user'}
                onClick={this.handleItemClick}>
                <Icon name='user circle' />
              </Menu.Item>
              <Menu.Item name='sign-out' active={activeItem === 'sign-out'} onClick={signOut}>
                Útskrá
        </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(Navbar);