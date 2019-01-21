import React, { Component } from 'react';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Container, Grid, Loader, Dimmer } from 'semantic-ui-react';
import AdminCards from './AdminCards'
import AdminNotifications from './AdminNotifications'

class Admin extends Component {
  state = {
    ticks: null,
    solveds: [],
    adminss: [],
    loaded: false,
  }

  // componentDidMount: function lifecycle
  componentDidMount() {
    const { admin } = this.props;
    // if: user isn't an admin, he'll be
    // moved to the Dashboard
    if (!admin) {
      this.props.history.push('/');
    }
  }

  // render: function
  // @return jsx
  render() {
    const { notifications, tickets, users } = this.props;
    // Initilize: various properties are gathered that are
    //            required to populate cards and notifications
    const tick = tickets && tickets.map(item => item)
    const priority = tick && tick.filter(item => item.priority && !item.solved)
    const solved = tick && tick.filter(item => !item.solved)
    const admins = users && users.filter(item => item.admin)
    const superAdmins = users && users.filter(item => item.superAdmin)

    if (!tickets || !solved || !admins || !superAdmins) {
      // While any of the properties aren't ready, a load screen will appear
      return (
        <Dimmer active inverted>
          <Loader size='massive' inline='centered'>Sæki gögn</Loader>
        </Dimmer>
      )
    }

    return (
      <Container style={{ marginTop: '8em' }}>
        <Grid>
          <Grid.Row>
            <AdminCards title={'Beiðnir'} info={tickets} icon={'check circle'} iconText={'Síðustu 7 daga'} color={'green'} secondaryIcon={'clock'} />
            <AdminCards title={'Óleystar'} info={solved} icon={'question circle'} iconText={priority.length + ' áríðandi'} color={'teal'} secondaryIcon={'exclamation circle'} />
            <AdminCards title={'Notendur'} info={users} icon={'user'} iconText={'Síðustu 30 daga'} color={'orange'} secondaryIcon={'clock'} />
            <AdminCards title={'Stjórnendur'} info={admins} icon={'key'} iconText={superAdmins.length + ' ofur'} color={'yellow'} secondaryIcon={'chess queen'} />
          </Grid.Row>
        </Grid>
        <Grid>
          <Grid.Row columns={16}>
            <AdminNotifications notifications={notifications} />
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

// mapStateToProps: function
// params state
// return [ticket, users, auth, notifications, admin]
const mapStateToProps = (state) => {
  const admin = (state.firebase.profile.admin)
  // Return: Properties for the component
  return {
    tickets: state.firestore.ordered.tickets,
    users: state.firestore.ordered.users,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    admin: admin
  }
}

// Gathering required values when the component is loaded.
export default compose(
  firestoreConnect([
    { collection: 'tickets', orderBy: ['createdAt', 'desc'] },
    { collection: 'users' },
    { collection: 'notifications', limit: 3, orderBy: ['time', 'desc'] }
  ]),
  connect(mapStateToProps),
)(Admin)
