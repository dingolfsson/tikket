import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
// import Notifications from '../dashboard/Notifications'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Container, Grid, Loader, Dimmer, Segment } from 'semantic-ui-react';
import AdminCards from './AdminCards'


class Admin extends Component {
  state = {
    ticks: null,
    solveds: [],
    adminss: [],
    loaded: false,
  }

  render() {
    const { isLoaded, notifications, tickets, users } = this.props;
    const tick = tickets && tickets.map(item => item)
    const priority = tick && tick.filter(item => !item.priority && !item.solved)
    const solved = tick && tick.filter(item => item.solved)
    const admins = users && users.filter(item => item.admin)
    console.log(priority)
    if (tickets === undefined || solved === undefined || admins === undefined) {
      return (
        <Dimmer active inverted>
          <Loader size='massive' inline='centered'>Sæki gögn</Loader>
        </Dimmer>
      )
    }

    return (
      <Container style={{ marginTop: '8em' }}>
        <Grid columns={4}>
          <Grid.Row>
            <Grid.Column>
              <AdminCards title={'Beiðnir'} info={tickets} icon={'check circle'} iconText={'Síðustu 7 daga'} color={'green'} secondaryIcon={'clock'} />
            </Grid.Column>
            <Grid.Column>
              <AdminCards title={'Óleystar'} info={solved} icon={'question circle'} iconText={priority.length + ' áríðandi'} color={'teal'} secondaryIcon={'exclamation circle'} />
            </Grid.Column>
            <Grid.Column>
              <AdminCards title={'Notendur'} info={users} icon={'user'} iconText={'Síðustu 30 daga'} color={'orange'} secondaryIcon={'clock'} />
            </Grid.Column>
            <Grid.Column>
              <AdminCards title={'Stjórnendur'} info={admins} icon={'key'} iconText={'X ofur'} color={'yellow'} secondaryIcon={'chess queen'} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const admin = (state.firebase.profile.admin)
  return {
    tickets: state.firestore.ordered.tickets,
    users: state.firestore.ordered.users,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    admin: admin
  }
}
// export default Admin;
export default compose(
  firestoreConnect([
    { collection: 'tickets', orderBy: ['createdAt', 'desc'] },
    { collection: 'users' },
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
  ]),
  connect(mapStateToProps),
)(Admin)
