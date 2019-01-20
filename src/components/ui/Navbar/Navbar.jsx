import './Navbar.css'
import { Menu, Container, Icon } from 'semantic-ui-react'
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../../store/actions/auth';

// TODO: Beiðnir always shows as active

class Navbar extends Component {

  state = { activeItem: '' }
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state
    const { admin } = this.props;

    return (
      <React.Fragment>
        <Menu size='large' fixed='top' secondary>
          <Container>
            <Menu.Item header name='Tikket'>
              <img alt='logo' src='/logo5.png' />
            </Menu.Item>
            <Menu.Item name='School'>
              Hörðuvallaskóli
          </Menu.Item>
            <Menu.Menu position='right'>
              {admin ? (
                <Menu.Item
                  as={NavLink}
                  to={'/admin'}
                  name='admin'
                  active={activeItem === 'admin'}
                  onClick={this.handleItemClick}
                >
                  Stjórnborð
        </Menu.Item>

              ) : null}
              <Menu.Item
                exact
                as={NavLink}
                to={'/'}
                name='tickets'
                active={activeItem === 'tickets'}
                className="inactive" activeClassName="active"
                onClick={this.handleItemClick}
              >
                Beiðnir
            </Menu.Item>
              <Menu.Item
                exact
                as={NavLink}
                to={'/profile'}
                name='user'
                active={activeItem === 'user'}
                onClick={this.handleItemClick}>
                <Icon name='user circle' />
              </Menu.Item>

              <Menu.Item name='sign-out' active={activeItem === 'sign-out'} onClick={this.props.signOut}>
                Útskrá
        </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(Navbar);