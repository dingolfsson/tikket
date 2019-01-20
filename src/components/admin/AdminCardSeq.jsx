import React, { Component } from 'react';
import AdminCards from './AdminCards'
import AdminNotifications from './AdminNotifications'
import { Grid } from 'semantic-ui-react';

class AdminCardSeq extends Component {

  render() {
      const {
          tickets, unsolved, users, admins, notifications,
          priority, superAdmins, clickOnTickets, clickOnUsers} = this.props;
    return (
        <Grid>
          <Grid.Row>
            <Grid.Column computer={4} mobile={8}>
              <AdminCards
                title={'Beiðnir'} info={tickets} icon={'check circle'}
                iconText={'Síðustu 7 daga'} color={'green'} secondaryIcon={'clock'}
                handleClickOnCard={clickOnTickets}
                />
            </Grid.Column >
            <Grid.Column computer={4} mobile={8}>
              <AdminCards
                title={'Óleystar'} info={unsolved} icon={'question circle'}
                iconText={priority.length + ' áríðandi'} color={'teal'} secondaryIcon={'exclamation circle'}
                handleClickOnCard={clickOnTickets}
                />
            </Grid.Column>
            <Grid.Column computer={4} mobile={8}>
              <AdminCards title={'Notendur'} info={users} icon={'user'}
              iconText={'Síðustu 30 daga'} color={'orange'} secondaryIcon={'clock'}
              handleClickOnCard={clickOnUsers}
              />
            </Grid.Column>
            <Grid.Column computer={4} mobile={8}>
              <AdminCards
                title={'Stjórnendur'} info={admins} icon={'key'}
                iconText={superAdmins.length + ' ofur'} color={'yellow'} secondaryIcon={'chess queen'}
                handleClickOnCard={clickOnUsers}
                />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={6} tablet={8} mobile={16}>
              <AdminNotifications notifications={notifications} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
    )
  }
}
export default AdminCardSeq;