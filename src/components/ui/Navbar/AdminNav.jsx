import { Menu, Container, Icon } from 'semantic-ui-react'
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminNav extends Component {

  render() {
    const { activeItem, signOut } = this.props;

    return (
      <React.Fragment>
        <Menu size='large' fixed='top' secondary>
          <Container>
            <Menu.Item as={Link} to={'/'}>
              <img alt='logo' src='/logo5.png' />
              <div style={{ 'paddingLeft': '1em' }}>Hörðuvallaskóli</div>
            </Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item
                as={Link}
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