import { Menu, Container, Icon } from 'semantic-ui-react'
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class AdminNav extends Component {

  render() {
    const { activeItem, signOut } = this.props;

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

export default AdminNav;